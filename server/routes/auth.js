// const router = require("express").Router();
import express from "express";
import User from "../Models/User.js"
import bcrypt from "bcrypt"
const router = express.Router();
 router.post("/register",async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
       const newUser = new User({
        email:req.body.email,
        username:req.body.username,
        password:hashedPass,
       }) 

       const user = await newUser.save();
       res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})




//login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
     
      !user && res.status(400).json("Wrong credentials!");
 
      const validated = await bcrypt.compare(req.body.password, user.password);
      console.log(validated)
      !validated && res.status(400).json("Wrong credentials!");

    //   const { password, ...others } = user._doc;
      res.status(200).json(user);
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
     
    }
  });


export default router;