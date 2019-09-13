"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _users = require("../../Validators/users");
var _Handler = require("./Handler");
var _jsonwebtoken = require("jsonwebtoken");var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require("passport");var _passport2 = _interopRequireDefault(_passport);


var _config = require("../../../config/config");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var log_obj = {}; // import authenticate from "../../utils/passport";
exports.default = function (router) {
  router.post('/user/register', _users.validator, function (req, res, next) {
    var user = {
      username: req.body.username,
      password: req.body.password };

    return (0, _Handler.saveuser)(user).
    then(function (data) {
      res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data });


      log_obj["message"] = data.message || "Internal server error";
      log_obj["action"] = "USER REGISTER";
      log_obj["success"] = true;
      log_obj["user"] = user.username;
      next();
    }).
    catch(function (err) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message || "INternal server error" });

      log_obj["message"] = err.message || "Internal server error";
      log_obj["action"] = "ERROR IN REGISTERING USER";
      log_obj["success"] = false;
      log_obj["user"] = user.username;
      next();
    });
  }, (0, _users.loggervalidator)(_config2.default, log_obj));

  router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    return (0, _Handler.getUserByName)(username, password).
    then(function (data) {
      var jwt_token = _jsonwebtoken2.default.sign({ username: username, userType: data.data.userType }, 'secret', { expiresIn: '1d' });
      res.status(data.statusCode).json({
        success: true,
        message: data.message,
        jwt_token: jwt_token });

      log_obj["message"] = data.message || "Internal server error";
      log_obj["action"] = "LOGIN";
      log_obj["success"] = true;
      log_obj["user"] = username;
      next();
    }).
    catch(function (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "INternal server error" });

      log_obj["message"] = err.message || "Internal server error";
      log_obj["action"] = "ERROR IN LOGGING";
      log_obj["success"] = false;
      log_obj["user"] = username;
      next();
    });
  }, (0, _users.loggervalidator)(_config2.default, log_obj));

  router.get('/profile', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    res.status(200).send({
      success: true,
      message: "user profile details",
      user: req.user });

    log_obj["message"] = "user profile details";
    log_obj["action"] = "autheticate";
    log_obj["success"] = true;
    log_obj["user"] = req.user.username;
    next();
  }, (0, _users.loggervalidator)(_config2.default, log_obj));
};