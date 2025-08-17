const { default: mongoose } = require("mongoose");
const { request } = require("express");
const product=require("../model/product")
const getAllProducts= async(req,res)=>{
    const {company,name,sort,select}= req.query;
    const query={};
    if (company){
        query.company=company
    }
    if (name){
        query.name={$regex:name,$options:"i"};
    }
    let apiResult=product.find(query);
    if(sort){
        let sortfix=sort.replace(","," ");
        apiResult=apiResult.sort(sortfix);
    }
    if(select){
        let selectfix=select.split(",").join(" ");
        apiResult=apiResult.select(selectfix);
    }
    // let page =Number(req.query.page) || 1; 
    // let limit =Number(req.query.limit) || 3;
    // let skip=(page -1)*limit;

    // apiResult=apiResult.skip(skip).limit(limit);
    const mydata=await apiResult;
    res.status(200).json({nbHits: mydata.length, products: mydata})};
const getAllProductsTesting= async(req,res)=>{
    const mydata=await product.find(req.query).select("name");
    console.log(req.query);
    res.status(200).json({mydata})};

module.exports={getAllProducts,getAllProductsTesting};
