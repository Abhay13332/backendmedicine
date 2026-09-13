import redis_exp from "redismn";
import {REDIS_PORT} from "../constants.js";
import dotenv from "dotenv";

export const redis = new redis_exp({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
});
await redis.start();
