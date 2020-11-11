const config = require("../config/index");
const jwt = require("jsonwebtoken");
const getJWT = require("../utils/get-jwt");
const { jwtSecret } = config;

module.exports = function(req, res, next) {
    const token = getJWT(req);

    if (!token) { next(); return; }; 
    
    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) { next(err); return; };  
        req.user = { _id: decoded.userId };
        res.locals.isLogged = !!req.user;
        next();
    });
};