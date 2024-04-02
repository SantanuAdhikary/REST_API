const { JWT_COOKIE_EXPIRE } = require("../config");
const USER_SCHEMA = require("../model/userSchema");
const ErrorResponse = require("../utilities/ErrorResponse");

/* 
   @desc POST ROUTE 
   @path => /api/auth/register
   @http method => POST
   @access => PUBLIC 
*/

exports.registerController = async(req,res)=>{
    try{
        const {username, email, role, password} = req.body;

    const user = await USER_SCHEMA.create({
        username,
        password,
        email,
        role
    });

    res
    .status(201)
    .json({success:true, message:"successfully created",user})
    
    }catch(err)
    {
        console.log(err)
    }
}

//! login functionality 


/* 
   @desc POST ROUTE 
   @path => /api/auth/login
   @http method => POST
   @access => PUBLIC 
*/

exports.LoginController = async(req,res,next)=>{
    try{

        const {email, password} = req.body;
        if(!email || !password)
        return next(new ErrorResponse("please provide valid email and password",400))

        //! check user exists or not 

    const user = await USER_SCHEMA.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorResponse("user not exists", 401))
    }

    //! compare entered password and database stored password 

    const isMatch = await user.matchPassword(password);

    if(!isMatch)
    {
        return next(new ErrorResponse("invalid password"),401)
    }

    // res.status(200).json({success:true, message:"successfully logged in",user})

    sendTokenResponse(user,200,res);

    }

    catch(err)
    {
        console.log(err)
    }
}

const sendTokenResponse = (user,statusCode,res)=>{

    //! create token 

    const token = user.getSignedJWTtoken();
    const options = {

        expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000) ,
        httpOnly:true,
    }

    if(process.env ==="production")
    {
        options.secure= true
    }
    res
    .status(statusCode)
    .cookie("token", token,options)
    .json({success: true, token})
}


