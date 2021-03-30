const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const port = process.env.PORT || 5000;

const { User } = require("./models/user");
const { auth } = require("./middleware/auth");


mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/product', require('./routes/product'))


app.listen(port, () => {
  console.log("Server is running on " + port);
});
