"use strict";var _joi = require("joi");var _joi2 = _interopRequireDefault(_joi);
var _winston = require("winston");var _winston2 = _interopRequireDefault(_winston);
var _config = require("../../config/config");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var validator = function validator(req, res, next) {

  var userInput = {
    username: req.body.username,
    password: req.body.password };


  var schema = _joi2.default.object().keys({
    username: _joi2.default.string().alphanum().min(6).max(20).required(),
    password: _joi2.default.string().regex(/^[a-z A-Z 0-9]{6,16}$/).min(6).required() }).
  with("username", "password");

  _joi2.default.validate(userInput, schema, function (err, value) {
    if (err === null)
    next();else
    {
      return res.status(400).json({
        success: false,
        message: "Joi validation error",
        stacktrace: err.details });

    }
  });


};



var loggervalidator = function loggervalidator(logger, log_obj) {return function (req, res, next) {
    if (log_obj["success"]) {
      logger.info(log_obj);
    } else
    {
      logger.error(log_obj);
    }
    next();
  };};

module.exports = {
  validator: validator,
  loggervalidator: loggervalidator };