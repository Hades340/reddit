const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const newsRoute = require("./routes/news");
const messageRoute = require("./routes/message");
const conversationRoute = require("./routes/conversation");

dotenv.config();

mongoose.connect(process.env.DB_URL, () => {
  console.log("CONNECTED TO MONGO DB");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Routes
app.get("/v1/", (req,res)=>{
  res.send("Hello world");
})
app.use("/v1/auth", authRoute);
app.use("/v1/post", postRoute);
app.use("/v1/users", userRoute);
app.use("/v1/news", newsRoute);
app.use("/v1/conversation", conversationRoute);
app.use("/v1/message", messageRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
