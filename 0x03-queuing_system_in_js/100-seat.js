#!/usr/bin/node
import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const client = redis.createClient();
const queue = kue.createQueue();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

let reservationEnabled = true;

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats) || 0;
}

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const currentAvailableSeats = await getCurrentAvailableSeats();

  if (currentAvailableSeats === 0) {
    reservationEnabled = false;
    return;
  }

  const newAvailableSeats = currentAvailableSeats - 1;

  await reserveSeat(newAvailableSeats);

  if (newAvailableSeats === 0) {
    reservationEnabled = false;
  }
});

queue.process('reserve_seat', async (job, done) => {
  const currentAvailableSeats = await getCurrentAvailableSeats();

  if (currentAvailableSeats === 0) {
    done(new Error('Not enough seats available'));
  } else {
    await reserveSeat(currentAvailableSeats - 1);
    if (currentAvailableSeats - 1 === 0) {
      reservationEnabled = false;
    }
    done();
  }
});

const port = 1245;app.listen(port, async () => {
  await reserveSeat(50);
  console.log(`Server is running on port ${port}`);
});

export default app;
