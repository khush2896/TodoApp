"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _Handler = require("./Handler");
var _jsonwebtoken = require("jsonwebtoken");var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _users = require("../../Validators/users");
var _config = require("../../../config/config");var _config2 = _interopRequireDefault(_config);

var _passport = require("passport");var _passport2 = _interopRequireDefault(_passport);
var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // import authenticate from "../../utils/passport";

var log_obj = {};exports.default =

function (router) {
  router.post('/addtask', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var work = req.body.work;
    var username = req.user.username;
    var status = false;
    return (0, _Handler.findTaskandSave)(work, status, username).
    then(function (data) {
      res.status(data.statusCode).json({
        success: true,
        message: data.message });

      log_obj["data"] = work;
      log_obj["message"] = data.message;
      log_obj["action"] = "ADDITION";
      log_obj["success"] = true;
      log_obj["user"] = req.user.username;
      next();
    }).
    catch(function (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
        stacktrace: err });

      log_obj["data"] = work;
      log_obj["message"] = err.message || "Internal server error";
      log_obj["action"] = "ADDITION";
      log_obj["success"] = false;
      log_obj["user"] = req.user.username;
      next();

    });
  }, (0, _users.loggervalidator)(_config2.default, log_obj));

  router.get('/listtask', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var username = req.user.username;
    return (0, _Handler.listalltask)(username).
    then(function (data) {
      // console.log(data.data._doc.creator)
      res.status(200).json({
        success: true,
        data: data.data });

      log_obj["message"] = data.message;
      log_obj["action"] = "LISTING";
      log_obj["success"] = true;
      log_obj["user"] = req.user.username;
      next();
    }).
    catch(function (err) {
      res.status(data.statuScode || 500).json({
        success: false,
        message: err.message || "Internal server error" });

      log_obj["message"] = err.message;
      log_obj["action"] = "LISTING";
      log_obj["success"] = false;
      log_obj["user"] = req.user.username;
      next();
    });

  }, (0, _users.loggervalidator)(_config2.default, log_obj));

  router.post('/updatetask/:taskId', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var taskId = req.params.taskId;
    var work = req.body.work;
    var username = req.user.username;
    console.log(username);
    // let username = req.user.username;
    return (0, _Handler.findStatusandUpdate)(taskId, work, username).
    then(function (data) {
      res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data });


      log_obj["data"] = work;
      log_obj["message"] = data.message || "Internal server error";
      log_obj["action"] = "UPDATE TASK";
      log_obj["success"] = true;
      log_obj["user"] = req.user.username;
      next();
    }).
    catch(function (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
        stacktrace: err });

      log_obj["data"] = work;
      log_obj["message"] = err.message || "Internal server error";
      log_obj["action"] = "UPDATE TASK";
      log_obj["success"] = false;
      log_obj["user"] = req.user.username;
      next();
    });
  }, (0, _users.loggervalidator)(_config2.default, log_obj));

  router.put('/updatetaskstatus/:taskId', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var taskId = req.params.taskId;
    var username = req.user.username;
    console.log(username);
    // let status = true;
    return (0, _Handler.updateStatus)(taskId, username).
    then(function (data) {
      res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data });


      // log_obj["data"] = work
      log_obj["message"] = data.message || "Internal server error";
      log_obj["action"] = "UPDATE STATUS";
      log_obj["success"] = true;
      log_obj["user"] = req.user.username;
      next();
    }).
    catch(function (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
        stacktrace: err });

      // log_obj["data"] = work
      log_obj["message"] = err.message || "Internal server error";
      log_obj["action"] = "UPDATE STATUS";
      log_obj["success"] = false;
      log_obj["user"] = req.user.username;
      next();
    });
  }, (0, _users.loggervalidator)(_config2.default, log_obj));


  router.delete('/deletetask/:taskId', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var taskId = req.params.taskId;
    var username = req.user.username;
    return (0, _Handler.findStatusandDelete)(taskId, username).
    then(function (data) {
      res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data });


      log_obj["message"] = data.message || "Internal server error";
      log_obj["action"] = "DELETE";
      log_obj["success"] = true;
      log_obj["user"] = req.user.username;
      next();
    }).
    catch(function (err) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stacktrace: err });

      // log_obj["data"] = work
      log_obj["message"] = err.message || "Internal server error";
      log_obj["action"] = "DELETE";
      log_obj["success"] = false;
      log_obj["user"] = req.user.username;
      next();
    });
  }, (0, _users.loggervalidator)(_config2.default, log_obj));

  router.post('/viewlog', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
    var filename = "./server.log";
    var max_size = parseInt(req.query.max_size);
    console.log(max_size);
    var file_data = [];
    var userType = req.user.userType;
    if (userType == "admin") {

      _fs2.default.readFile(filename, "utf8", function (err, data) {
        if (err) {
          // may be filename does not exists?
          res.status(500).send(err);
        } else {
          data = data.split("\n");
          console.log(max_size);
          if (max_size > data.length)
          max_size = data.length;
          var c = 0;
          for (var i = data.length - 1; i >= 0; i--) {
            if (c == max_size)
            break;
            file_data.push(data[i]);
            c += 1;
          }
          return res.status(200).send({
            statuScode: 200,
            success: true,
            message: "log data",
            data: file_data });

        }
      });
    } else {
      return res.status(401).send({
        statuScode: 401,
        success: false,
        message: "user not allowed to view logs" });

    }

  });
};