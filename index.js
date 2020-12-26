const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");

mongoose.connect(config.mongoURL, { useNewUrlParser: true, }).then(()=> console.log("MongoDB connected.")).catch(err=>console.log(err))

const port = 5000;

app.get('/', (req, res)=>{
    res.send("Hello world");
})






app.listen(port, ()=>{
    console.log("Server is running on "+port);
})