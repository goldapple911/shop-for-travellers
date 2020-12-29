const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");




const config = require("./config/key");
const port = 5000;



const {User} = require("./models/user");

mongoose.connect(config.mongoURL, { useNewUrlParser: true, }).then(()=> console.log("MongoDB connected.")).catch(err=>console.log(err))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res)=>{
    const user = new User(req.body)
    user.save((err, userData)=>{
        if(err){
            return res.json({success: false, err})
        }
        return res.status(200);
    })

})


app.get('/', (req, res)=>{
    res.send("Hello world");
})



app.listen(port, ()=>{
    console.log("Server is running on "+port);
})