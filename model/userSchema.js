const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config");

const userSchema = new Schema(
    {
        username: {
            type :String,
            required: [true , "user name is required"]
        },
        email:{
            type:String,
            required: [true, "email is required"],
            unique: true

        },
        password:{
            type:String,
            required:[true, "password is required"],
            minlength: 6,
            select:false
        },
        role: {
            type : String,
            enum : ["user", "publisher"],
            default: "user"
        },
      
    },
    {timestamps : true}
)

userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt );
});

userSchema.methods.matchPassword = async function( enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//! creating jwt token

userSchema.methods.getSignedJWTtoken = function(){
    return jwt.sign({id:this._id}, JWT_SECRET,{expiresIn: JWT_EXPIRE})
}

let user= model("user", userSchema)
module.exports = user