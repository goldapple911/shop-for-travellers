const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User } = require("../models/user");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads/')
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


module.exports = router;