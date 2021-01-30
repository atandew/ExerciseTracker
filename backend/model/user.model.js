const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    role: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      minlength: 3
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3
    },
    mobileno: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 15
    }
  },
  {
    timestamps: true,
  }
);

const User = Mongoose.model("User", userSchema);

module.exports = User;
