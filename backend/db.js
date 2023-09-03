const mongoose=require ("mongoose");
// const mongoURI="";  //add your mongodb string
const connectToMongo=()=>{
mongoose.connect(mongoURI)
   .then(()=>{
    console.log("Connected to mongodb successfully");
   })
   .catch((error)=>{
    console.log("Erorr connecting mongo db :",error);
   })
}

module.exports=connectToMongo;