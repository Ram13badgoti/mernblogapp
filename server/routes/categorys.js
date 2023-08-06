// const router = require("express").Router();
import express from "express";
import Category from "../Models/Category.js"

const router = express.Router();

//CREATE NEW POST
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error)
  }
});

//get post
router.get("/", async (req, res) => {

    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (error) {
      res.status(500).json(error)
    }
  });

export default router;