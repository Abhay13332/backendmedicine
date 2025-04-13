import mongoose from 'mongoose'
import {redis} from "../sync/redis.js";

const injectionSchema=mongoose.Schema({
    injectionname:{
        type:String,
        unique:true,
        required:true,
        index:true,
    },
    prescription:String, //required or not
    marketer:String,
    composition:String,
    price:Number,
    img:String,
    data:{
        type:mongoose.Types.ObjectId,
        ref:'mdata',

    }
});
export const injection=mongoose.model('injection',injectionSchema);
redis.jsonSchemaIdx("injection", [{
    "key_name":"injectionname",
    "tag_type":"TEXT",
    "sortable":true,

},{
    "key_name":"composition",
    "tag_type":"TEXT",

}]);
