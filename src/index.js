import {} from "./sync/mongosearch.js";

import {mainpagesearch, redisgetcomp} from "./controllers/pagesearchandmedicsearch.js";
import {medicsearch} from "./controllers/medicsearch.js";
import {redis} from "./sync/redis.js";
import {getrandom,pagination}  from "./controllers/randomsearch.js";
import {LISTENING_PORT} from "./constants.js";
import {trycatchexec, trycatchhandler} from "./utils/trycatchhandler.js";
import express, {response} from "express";
import cors from "cors";
import {searchbarquery} from "./controllers/searchbarquery.js";
import dotenv from "dotenv";
dotenv.config({
    path: "../env",
    });
const app = express();
app.use(cors());
app.use(express.json());

app.post("/search/pagesearch", trycatchhandler(mainpagesearch,(err)=>{console.log(err)}))
app.post("/search/searchbarquery",trycatchhandler(searchbarquery,(err)=>{console.log(err.message)}))
app.listen(LISTENING_PORT,()=>{
    console.log(`Server started on port ${LISTENING_PORT}`);
})
app.post("/search/medicsearch",trycatchhandler(medicsearch,(err,res)=>{console.log(err.message)
res.send(err.message)}))

app.post("/getrandomdata",trycatchhandler(getrandom,(err,res)=>{console.log(err.message);res.send(err.message)}));
