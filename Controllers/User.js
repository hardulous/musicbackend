const byCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/User.js');
const SECRET = "AMAN BISHT"

const createUser = async(req,res)=>{

    try {
        const { first_name, last_name, email,password } = req.body
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({success:false,message:"User with this email already exist"})
        }
        else{
           const newUser = await User.create({first_name,last_name, email,password})
           const payload = {
            id:newUser.id
           } 
           const token = jwt.sign(payload,SECRET);          
           return res.status(201).json({success:true,token});
        }

    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

const loginUser = async(req,res)=>{

    try {
        
      const { first_name, last_name, email,password } = req.body
      const isUserExist = await User.findOne({email});       
      if(!isUserExist){
        return res.status(400).json({success:false,message:"User with this email does not exist"})
      }
      if(password!==isUserExist.password){
        return res.status(400).json({success:false,message:"Wrong credentials"})
      }
      else{
        const payload ={
            id:isUserExist.id
        }
        const token = jwt.sign(payload,SECRET)
        return res.status(200).json({success:true,token})
      }

    } catch (error) {
      return res.status(400).json({success:false,message:error.message})    
    }

}

const fetchUser = async(req,res,next)=>{

  try {
    
    const token = req.headers["auth-token"]
    if(!token){

      res.status(401).send({success:false,message:"Please authenticate using a valid token"});
  }
    const data = jwt.verify(token,SECRET); 
    req.user = data; 
    next(); 
    
  } catch (error) {
    return res.status(400).json({success:false,message:error.message})
  }

}

const getUser = async(req,res)=>{
  try {
    
    const authUser = await User.findById(req.user.id)
    if(!authUser){
      return res.status(400).json({success:false,message:"You are not logged in"})
    }
    else{
      return res.status(200).json({success:true,authUser})
    }

  } catch (error) {
    return res.status(400).json({success:false,message:error.message})
  }
}

module.exports = {
    createUser,
    loginUser,
    fetchUser,
    getUser
}