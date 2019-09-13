import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String
  }
});
userSchema.pre('save', function (next) {
  this.userType = "generaluser";
  next();
})

const userModel = mongoose.model("Users", userSchema);

const creatuser = user => user.save();

// const finduserByID = (userID) => userModel.findById(userID);

const fiduserByname = (username) => userModel.findOne({ username: username });

module.exports = {
  userModel,
  creatuser,
  fiduserByname
};
