const express =require('express')
const cors=require('cors')
const app=express();
const mongoose=require('mongoose')
const assetRouter=require('./assetData.router');
app.use(cors())
app.use(express.json())
app.listen(3000,()=>{
    console.log("Server stared at", 3000)
})

mongoose.connect("mongodb+srv://ashwinumbarkar:Rama2018@hcdata.pbrv6.mongodb.net/AssetTable?retryWrites=true&w=majority&appName=HCData").
then(()=>{console.log("DB connected")}).catch((e)=>{console.log("DB not connected")})
app.use("/api/assets",assetRouter)