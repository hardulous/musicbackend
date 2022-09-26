const User = require('../Model/User.js');
const byCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "AMAN BISHT"

const createUser = async(req,res)=>{

    try {
        const { first_name, last_name, email,password } = req.body
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({success:false,message:"User with this email already exist"})
        }
        else{
           const payload = {
             email,
             password
           } 
           const newUser = await User.create({first_name,last_name, email,password})
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
            email,
            password
        }
        const token = jwt.sign(payload,SECRET)
        return res.status(200).json({success:true,token})
      }

    } catch (error) {
      return res.status(400).json({success:false,message:error.message})    
    }

}

module.exports = {
    createUser,
    loginUser
}