const jwt = require("jsonwebtoken");
const USER_SCHEMA = require("../model/userSchema");
const ErrorResponse = require("../utilities/ErrorResponse");
const { JWT_SECRET } = require("../config");

exports.protect = async(req,res,next)=>{
    var token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token)
    {
        return next(new ErrorResponse("Unauthorized",401))
    }

    //! decode token 

    try{
        //! verify 
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.user = await USER_SCHEMA.findById(decoded.id);
        next();
    }catch(err)
    {
        return next(new ErrorResponse("not authorized to this route", 401))
    }
}


//! GRANT ACCESS TO SPECIFIES ROLES 

exports.authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(
                new ErrorResponse(
                    `user role ${req.user.role} is not authorizied to access this route`
                )
            )
        }
        next();
    }
}