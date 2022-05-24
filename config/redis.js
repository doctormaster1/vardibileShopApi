import redis from "redis";

const client = redis.createClient({ url: process.env.REDIS_URI });

client.on("error", (error) => console.log(error));
client.on("connect", () => console.log("Connected to Redis"));

export default client;
