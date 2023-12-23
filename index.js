const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cloudinary = require("./utils/cloudinary");
const cors = require('cors');
app.use(express.json());
const fs = require("fs").promises; 
const { exec } = require("child_process");
const voice = require("elevenlabs-node");
const  commentRoutes = require('../api/routes/commentRoutes');



const corsOptions = {
  origin: '*', // Allow any origin (not recommended for production)
  credentials: true,
  exposedHeaders: ['Content-Length'], 
};

app.use(cors(corsOptions));





app.get("/", (req, res) => {
  res.send("Hello World!");
});







app.use(cors());






dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.urlencoded({
  extended: false
}));

           

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
  // Create a separate connection to the second MongoDB cluster

  


// Define other API endpoints
app.get('/', (req, res) => {
  res.send('Success!!!!!!');
});



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use('/api/comments', commentRoutes);

app.listen("5000", () => {
  console.log("Backend is running.");
});
