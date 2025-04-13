import mongoose from 'mongoose';
import {capsule} from "../models/capsule.js";
import {ayurvedic} from "../models/ayurvedic.js";
import {injection} from "../models/injection.js";
import {healthysnacks} from "../models/healthysnacks.js";
import {medicine} from "../models/medicine.js";
import {protein} from "../models/proteins.js";
import {syrup} from "../models/syrup.js";
import {vitamin} from '../models/vitamins.js';
import { trycatchexec} from "../utils/trycatchhandler.js"

trycatchexec(async()=>{
   await mongoose.connect(process.env.MONGO_URI);
   console.log("mongodb connected")},()=>{
    console.log("MongoDB not Connected");
})



