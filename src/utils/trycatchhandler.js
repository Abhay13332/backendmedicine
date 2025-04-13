export const trycatchhandler=(fn,fnerr)=>{
    return async (req,res,next)=>{
        try {
           return await fn(req,res,next);
        }
        catch (err){
            if (fnerr){
                fnerr(err,res)
            }else{
                res.status(400).send({error:err});
            }

        }
    }
};
const  trycatchgeneral=(fn,fnerr)=>{
    return async (...varia)=>{
        try {
            return await fn(...varia)
        }
        catch (err){
            if (fnerr){
               return fnerr(err)
            }else{
                console.log(err.message);
            }

        }
    }
}
export const trycatchexec=async(fn,fnerr,...varia)=>{
   return await trycatchgeneral(fn,fnerr)(...varia);
}
