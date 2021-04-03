const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User } = require("../models/user");
const { Product } = require("../models/product");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")
    // after getting the images from client, images should be saved in node server.
    // multer library
    router.post("/uploadImage", auth, (req, res) => {

        upload(req, res, err => {
            if (err) {
                console.log(err);
                return res.json({ success: false, err })
            }
            return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
        })
    
    });


    // save all the data from the client
    router.post("/uploadProduct", auth, (req, res) => {
        const product = new Product(req.body);
        product.save((err, data)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true})
        })
    });

    router.post("/getProducts", (req, res)=>{
        let order = req.body.order ? req.body.order : "desc";
        let sortBy = req.body.sortBy? req.body.sortBy : "_id";
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = parseInt(req.body.skip); 
        let search = req.body.keyword;
        let findArgs = {};
        
    
        for (let key in req.body.filters){
            if(req.body.filters[key].length > 0){
                if(key === "price"){
                    findArgs[key]= {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    }
                }else{
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
        if(search){
            console.log(search);
            Product.find(findArgs)
            .find({$text: {$search: search}})
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products)=>{
                if(err) return res.status(400).json({success: false, err});
                res.status(200).json({success: true, products, postSize: products.length})
            })
        }else{
            Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products)=>{
                if(err) return res.status(400).json({success: false, err});
                res.status(200).json({success: true, products, postSize: products.length})
            })
        }

    })

    router.get("/by_id", (req, res) => {
        let id = req.query.id;
        let type= req.query.type;

   
        if(type ==="array"){
            let ids = req.query.id.split(',');
            id=[...ids];
        }

        Product.find({_id:{$in:id}}).populate('writer').exec((err, product)=>{
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, product});
        })

    });




module.exports = router;