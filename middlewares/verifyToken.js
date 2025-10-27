const Vendor = require("../models/venderModel");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = async (req,res,next) => {
    const token = req.headers.token || req.headers.bearer;
    if(!token){
        return res.status(401).json({message: "token is not provided"});
    }
    try{
   const decoded =  jwt.verify(token, jwtSecret);
   const vendor = await Vendor.findById(decoded.vendorId);
   if(!vendor){
    return res.status(401).json({message:"vendor not found"});
   }

   req.vendorId = vendor._id;
   next();
    }catch(error){
        console.error(error);
        return res.status(401).json({message:"Invalid Error"})
    }
}

module.exports = verifyToken;