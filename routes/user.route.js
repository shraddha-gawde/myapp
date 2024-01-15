const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {userModel } = require("../models/user.model")
const { blacklistModel } = require("../models/blacklist.model")

const userRouter = express.Router()

userRouter.post("/register", async(req, res)=>{
    const {name, email, password, age, city} = req.body
    try{
        const existUser = await userModel.findOne({email})
        if(existUser){
            return res.status(200).json({msg:"User already exist, please login"})
        }
        bcrypt.hash(password, 5, async(err, hash)=>{
            const user = new userModel({name, email, password:hash, age, city})
            await user.save()
            res.status(200).json({msg:"the new user has been registed"})
        })
    }catch(err){
        res.status(400).json({error:err})
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password,(err, result)=>{
                if(err){
                    res.status(200).json({msg:"user does not exist"})
                }
                if(result){
                    const access_token = jwt.sign({userID:user._id}, "instaMasai",{expiresIn:"7d"})
                    const refesh_token = jwt.sign({userID:user._id}, "instaMasai",{expiresIn:"14d"})

                    res.status(200).json({msg:"login Succesfull", access_token, refesh_token})
                }else{
                    res.status(200).json({msg:"user does not exist"})
                } 
            })
        }else{
            res.status(200).json({msg:"user does not exist"})
        }
        
    }catch(err){
        res.status(400).json({error:err})
    }
})


userRouter.get("/logout", async(req, res)=>{
    const access_token = req.headers.authorization?.split(" ")[1]
    const refresh_token = req.headers.authorization?.split(" ")[2]

    try{
        const blacklist = new blacklistModel({access_token, refresh_token})
        await blacklist.save()
        res.status(200).json({msg:"user has been logout"})
    }catch(err){
        res.status(400).json({error:err})
    }
})

module.exports={
    userRouter
}