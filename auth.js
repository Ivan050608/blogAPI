const jwt = require("jsonwebtoken");
const secret = "blogApi";


   module.exports.createAccessToken = (user) => {

        const data = {
            id : user._id,
            email : user.email,
            isAdmin : user.isAdmin
        };

        return jwt.sign(data, secret, {});
        
    };

    module.exports.verify = (req, res, next) => {
        console.log(req.headers.authorization);

        let token = req.headers.authorization;

        if(typeof token === "undefined"){
            return res.send({ auth: "Failed. No Token" });
        } else {
            token = token.slice(7, token.length);
            jwt.verify(token, secret, function(err, decodedToken){

                if(err){
                    return res.send({
                        auth: "Failed",
                        message: err.message
                    });

                } else {

                    req.user = decodedToken;
                    next();
                }
            })
        }
    };


    module.exports.verifyAdmin = (req, res, next) =>{
    // console.log("result from verifyAdmin method");
    // console.log(req.user)

    if(req.user.isAdmin){
        next()
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}