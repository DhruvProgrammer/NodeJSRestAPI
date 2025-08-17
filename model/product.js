const mongoose= require("mongoose");

const productsscheme=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:[true,"price must be provided"],
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.9,
    },
    createdate:{
        type:Date,
    },
    company:{
        type:String,
        enum:{
            values:["apple","samsung","dell","mi"],
            message:`value  is not supported`,
        },
    },

});

module.exports=mongoose.model("Product",productsscheme);