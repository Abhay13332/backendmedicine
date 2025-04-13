import {mainpagesearch, redisgetcomp} from "./controllers/pagesearchandmedicsearch.js";
import {medicsearch} from "./controllers/medicsearch.js";
import {redis} from "./sync/redis.js";
import {getrandom,pagination}  from "./controllers/randomsearch.js";
import {LISTENING_PORT} from "./constants.js";
import {} from "./sync/mongosearch.js";
import {trycatchexec, trycatchhandler} from "./utils/trycatchhandler.js";
import express, {response} from "express";
import cors from "cors";
import {searchbarquery} from "./controllers/searchbarquery.js";
import dotenv from "dotenv";
import {medicine} from "./models/medicine.js";
import {capsule} from "./models/capsule.js";
dotenv.config({
    path: "../env",
    });
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.post("/search/pagesearch", trycatchhandler(mainpagesearch,(err)=>{console.log(err)}))
app.post("/search/searchbarquery",trycatchhandler(searchbarquery,(err)=>{console.log(err.message)}))
app.listen(8005,()=>{
    console.log(`Server started on port ${8005}`);
})
app.post("/search/medicsearch",trycatchhandler(medicsearch,(err,res)=>{console.log(err.message)
res.send(err.message)}))
// console.log(await searchbarquery({body:{query:"anu"}}));
// console.log(await redis.jsongetAll("anu","search"));
redisgetcomp("Above 5-D Capsule",[capsule,"capsule","capsulename"])
app.post("/getrandomdata",trycatchhandler(getrandom,(err,res)=>{console.log(err.message);res.send(err.message)}));