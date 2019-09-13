"use strict";var _mongoose = require("mongoose");var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var userSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    unique: true,
    required: true },

  password: {
    type: String,
    required: true },

  userType: {
    type: String,
    default: "general" } });




var userModel = _mongoose2.default.model("Users", userSchema);

var creatuser = function creatuser(user) {return user.save();};

// const finduserByID = (userID) => userModel.findById(userID);

var fiduserByname = function fiduserByname(username) {return userModel.findOne({ username: username });};

module.exports = {
  userModel: userModel,
  creatuser: creatuser,
  fiduserByname: fiduserByname };