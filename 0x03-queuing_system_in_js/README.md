# Queuing System in JS

This project focuses on creating a queuing system using Redis, Node.js, Kue, and Express. 
It demonstrates how to set up a Redis server, use Kue to create job queues, and 
develop an Express application interacting with a Redis server.

## Requirements
- Ubuntu 18.04
- Node.js 12.x
- Redis 5.0.7+
- Kue
- Express

## Task Breakdown
1. **Redis Setup** - Install and run Redis.
2. **Node Redis Client** - Create a Redis client with Node.js and log connection messages.
3. **Basic Operations** - Perform basic operations like setting and getting values.
4. **Async Operations** - Use Promisify to handle async Redis operations.
5. **Hash Operations** - Store and retrieve hash values from Redis.
6. **Pub/Sub System** - Implement publisher and subscriber clients.
7. **Job Creator** - Create a Kue-based job queue.
8. **Job Processor** - Process jobs in a queue.
9. **Progress Tracking** - Track the progress of queued jobs.
10. **Stock System** - Implement a basic product stock system using Redis and Express.
11. **Seat Reservation** - Create a seat reservation system using Kue and Redis.
