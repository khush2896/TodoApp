"use strict";var _Model = require("./Model");
var _bcryptjs = require("bcryptjs");var _bcryptjs2 = _interopRequireDefault(_bcryptjs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var saveuser = function saveuser(user) {
  return (0, _Model.fiduserByname)(user.username).
  then(function (data) {
    if (!data) {
      return _bcryptjs2.default.genSalt(10);
    } else {
      return Promise.reject({
        statusCode: 409,
        message: "user already exists" });

    }
  }).
  then(function (salt) {
    return _bcryptjs2.default.hash(user.password, salt);
  }).
  then(function (hash) {
    // newuser.password = hash;
    var newuser = new _Model.userModel({
      username: user.username,
      password: hash });


    return (0, _Model.creatuser)(newuser);
  }).
  then(function (data) {
    if (data) {
      return Promise.resolve({
        statusCode: 200,
        message: "user created sucessfully",
        data: data });

    } else {
      return Promise.reject({
        statusCode: 400,
        message: "error while creating a user" });

    }
  }).
  catch(function (err) {
    return Promise.reject({
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error" });

  });
};

// Better anmes for function
var getUserByName = function getUserByName(username, password) {
  var out_user = {};
  return (0, _Model.fiduserByname)(username).
  then(function (user) {
    out_user = user._doc;
    return _bcryptjs2.default.compare(password, user.password);
  }).
  then(function (res) {
    if (res == true) {
      return Promise.resolve({
        statusCode: 200,
        message: "user validated  sucessfully",
        data: out_user });

    } else {
      return Promise.reject({
        statusCode: 400,
        message: "error while validating a user" });

    }
  }).
  catch(function (err) {
    console.log(err);
    return Promise.reject({
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error" });


  });
};


// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(newuser.password, salt, (err, hash) => {
//     if (err) {
//       return err;
//     } else
//       newuser.password = hash;
//     return creatuser(newuser)
//       .then(data => {
//         if (data) {
//           return Promise.resolve({
//             statusCode: 200,
//             message: "user created sucessfully",
//             data: data
//           });
//         } else {
//           return Promise.reject({
//             statusCode: 400,
//             message: "error while creating a user",
//             data: data
//           });
//         }
//       })
//       .catch(err => {
//         return Promise.reject({
//           statusCode: err.statusCode || 500,
//           message: err.message || "Internal Server Error",
//         });
//       });

//   });
// });
// return createuser(newuser)



module.exports = {
  saveuser: saveuser,
  getUserByName: getUserByName };