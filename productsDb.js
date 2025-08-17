require("dotenv").config();
const connectDB=require("./db/connect");
const product=require("./model/product");
const productjson=require("./products.json")
const start=async()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        await product.deleteMany();
        await product.create(productjson);
        console.log("succes");
    }catch(error){
        console.log(error);
    }
};
start();