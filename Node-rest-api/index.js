const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require('cors')
const multer = require("multer");
const path = require("path");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
app.use(cors())
mongoose.connect(
    process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}
).then(()=>{console.log("connected")}).catch((err)=>console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/cover", express.static(path.join(__dirname, "public/cover")));
app.use("/profile", express.static(path.join(__dirname, "public/profile")));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const profileStorage = multer.diskStorage({
  destination: (req, file, bb) => {
    bb(null, "public/profile");
  },
  filename: (req, file, bb) => {
    bb(null, req.body.name);
  },
});

const coverStorage = multer.diskStorage({
  destination: (req, file, ab) => {
    ab(null, "public/cover");
  },
  filename: (req, file, ab) => {
    ab(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


const profileUpload = multer({ storage: profileStorage });
app.post("/api/profileUpload", profileUpload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


const coverUpload = multer({ storage: coverStorage });
app.post("/api/coverUpload", coverUpload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});