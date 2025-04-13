import redis_exp from "redismn";
import {REDIS_PORT} from "../constants.js";

export const redis = new redis_exp(process.env.REDIS_URI,REDIS_PORT);
await redis.start();
