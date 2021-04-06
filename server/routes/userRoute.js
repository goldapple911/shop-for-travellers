const express = require('express');
const router = express.Router();
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Payment } = require("../models/payment");

const { auth } = require("../middleware/auth");
const async = require('async');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ registerSuccess: false, err });
        return res.status(200).json({
            registerSuccess: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    const productId = req.body.productId;
    //find the user
    User.findOne({_id: req.user._id}, (err, user)=>{
        let duplicate = false;
        if(user.cart){
            user.cart.forEach(item =>{
                if (item.id == productId) {
                    duplicate = true;
                }
            });
        }

        if(duplicate){
            User.findOneAndUpdate({_id: req.user._id, "cart.id": productId},   { $inc: { "cart.$.quantity": 1 } }, {new: true}, (err, userFound)=>{
                if(err) return res.json({ success: false, err });
                return res.status(200).send(userFound.cart);
            })
        }else{
            User.findOneAndUpdate({_id: req.user._id},{$push: {cart:{id:productId, quantity: 1, date: Date.now()}}}, {new: true}, (err,userFound)=>{
                if(err) return res.json({ success: false, err });
                return res.status(200).send(userFound.cart);
            })
        }

    })
});

router.get("/removeCartItem", auth, (req,res)=>{
    const productId = req.query.id;


    User.findOneAndUpdate({_id: req.user._id}, {"$pull" : {"cart": {id: productId}}}, {new: true} , (err, userInfo)=>{
        let cart = userInfo.cart;

        let array = cart.map(item =>{
            return item.id
        })
        Product.find({_id: {$in: array}}).populate('writer').exec((err, cartDetail)=>{
            return res.status(200).json({cartDetail,cart })
        })

    })
})

router.get('/userCartInfo', auth, (req, res)=>{
    User.findOne({_id: req.user._id}, (err, userInfo)=>{
        let cart = userInfo.cart;
        let array = cart.map(item =>{
            return item.id
        })
        Product.find({_id: {$in: array}}).populate('writer').exec((err, cartDetail)=>{
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, cartDetail,cart })
        })

})
})

router.post('/successBuy', auth, (req, res)=>{
    let history =[];
    let transactionData={};
    
    // put brief payment info inside user collection
    req.body.cartDetail.forEach(item =>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id:item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })


    // put payment info that comes from paypal into payment collection
    transactionData.user={
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    transactionData.data=req.body.paymentData;
    transactionData.product=history;

    User.findOneAndUpdate({_id: req.user._id}, {$push: {history: history}, $set: {cart: []}}, {new: true}, (err, user)=>{
        if(err) return res.status(400).json({success: false, err})

        const pay = new Payment(transactionData);
        pay.save((err, doc)=>{
            if(err) return res.status(400).json({success: false, err})
              // increase the amount of number for the sold info

              let products =[];
              doc.product.forEach(item=>{
                  products.push({id: item.id, quantity: item.quantity})
              })

              async.eachSeries(products, (item, callback)=>{
                  Product.update(
                  {_id: item.id},
                  {
                      $inc: {
                          sold: item.quantity
                      }
                  },
                  {new: false},
                  callback
                  )
              }, (err)=>{
                if(err) return res.status(400).json({success: false, err})
                return res.status(200).json({success: true, cart: user.cart, cartDetail:[]})
              })
    })


})
})

router.get('/getHistory', auth, (req, res)=>{
    User.findOne({_id: req.user._id}, (err, user)=>{
        let history = user.history;
        if(err)return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, history})

    })
})

module.exports = router;