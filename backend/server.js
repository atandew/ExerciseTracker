const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect to MONGO_DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//connect to the database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

//Connecting the backend routes with this server.js

const exerciseRouter = require("./routes/exersise");
const userRouter = require("./routes/user");

app.use("/exercise", exerciseRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});