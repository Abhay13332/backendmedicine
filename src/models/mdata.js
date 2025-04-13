import mongoose from "mongoose";
const dataSchema=mongoose.Schema({
    brief:String,
    uses:[String],
    sideeffects:[String],
    sideeffectbrief:String,

});
export const mdata=mongoose.model("mdata",dataSchema);
