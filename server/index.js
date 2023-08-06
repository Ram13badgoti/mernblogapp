import express from "express";
import dotenv from "dotenv";
import Connection from "./Database/db.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categorys.js";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


mongoose.set("strictQuery", false);
const MONGO_URL = process.env.MONGO_URL;
Connection(MONGO_URL); 

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

if ( process.env.NODE_ENV == "production"){
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'blogapp', 'build')));
      res.sendFile(path.resolve(__dirname, 'blogapp', 'build', 'index.html'));

  })
}

app.listen(process.env.PORT || 5000, () => {
  console.log("App listening on  port 5000!");
});

