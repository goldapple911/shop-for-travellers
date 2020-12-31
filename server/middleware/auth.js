const {User} = require('../server/models/user');


let auth = (req, res, next)=>{
    const token = req.cookie.x_auth;

    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next()
    })
}

module.exports = {auth};