#!/usr/bin/node
import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

const HolbertonSchools = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

for (const [school, value] of Object.entries(HolbertonSchools)) {
  client.hset('HolbertonSchools', school, value, redis.print);
}

client.hgetall('HolbertonSchools', (err, object) => {
  console.log(object);
});
