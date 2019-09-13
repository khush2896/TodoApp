import { findTaskandSave, listalltask, findStatusandUpdate, updateStatus, findStatusandDelete } from "./Handler";
import jwt from "jsonwebtoken";
import { loggervalidator, taskValidator } from "../../Validators/users";
import logger from "../../../config/config"

// import authenticate from "../../utils/passport";
import passport from "passport";
import fs from "fs";

const log_obj = {}

export default router => {
  router.post('/addtask', taskValidator, passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const work = req.body.work;
    const username = req.user.username;
    const status = false;

    return findTaskandSave(work, status, username)
      .then(data => {
        res.status(data.statusCode).json({
          success: true,
          message: data.message
        });
        log_obj["data"] = work
        log_obj["message"] = data.message
        log_obj["action"] = "ADDITION"
        log_obj["success"] = true
        log_obj["user"] = req.user.username
        next();
      })


      .catch(err => {
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
        log_obj["data"] = work
        log_obj["message"] = err.message || "Internal server error"
        log_obj["action"] = "ADDITION"
        log_obj["success"] = false
        log_obj["user"] = req.user.username
        next();

      });
  }, loggervalidator(logger, log_obj));

  router.get('/listtask', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let username = req.user.username;
    return listalltask(username)
      .then(data => {
        // console.log(data.data._doc.creator)
        res.status(200).json({
          success: true,
          data: data.data
        });
        log_obj["message"] = data.message
        log_obj["action"] = "LISTING"
        log_obj["success"] = true
        log_obj["user"] = req.user.username
        next();
      })
      .catch(err => {
        res.status(data.statuScode || 500).json({
          success: false,
          message: err.message || "Internal server error"
        })
        log_obj["message"] = err.message
        log_obj["action"] = "LISTING"
        log_obj["success"] = false
        log_obj["user"] = req.user.username
        next();
      });

  }, loggervalidator(logger, log_obj));

  router.post('/updatetask/:taskId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let taskId = req.params.taskId;
    let work = req.body.work;
    let username = req.user.username;
    console.log(username)
    // let username = req.user.username;
    return findStatusandUpdate(taskId, work, username)
      .then(data => {
        res.status(data.statusCode).json({
          success: true,
          message: data.message,
          data: data.data

        });
        log_obj["data"] = work
        log_obj["message"] = data.message || "Internal server error"
        log_obj["action"] = "UPDATE TASK"
        log_obj["success"] = true
        log_obj["user"] = req.user.username
        next();
      })
      .catch(err => {
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
        log_obj["data"] = work
        log_obj["message"] = err.message || "Internal server error"
        log_obj["action"] = "UPDATE TASK"
        log_obj["success"] = false
        log_obj["user"] = req.user.username
        next();
      });
  }, loggervalidator(logger, log_obj));

  router.put('/updatetaskstatus/:taskId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let taskId = req.params.taskId;
    let username = req.user.username;
    console.log(username)
    // let status = true;
    return updateStatus(taskId, username)
      .then(data => {
        res.status(data.statusCode).json({
          success: true,
          message: data.message,
          data: data.data

        });
        // log_obj["data"] = work
        log_obj["message"] = data.message || "Internal server error"
        log_obj["action"] = "UPDATE STATUS"
        log_obj["success"] = true
        log_obj["user"] = req.user.username
        next();
      })
      .catch(err => {
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
        // log_obj["data"] = work
        log_obj["message"] = err.message || "Internal server error"
        log_obj["action"] = "UPDATE STATUS"
        log_obj["success"] = false
        log_obj["user"] = req.user.username
        next();
      });
  }, loggervalidator(logger, log_obj));


  router.delete('/deletetask/:taskId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let taskId = req.params.taskId;
    let username = req.user.username;
    return findStatusandDelete(taskId, username)
      .then(data => {

        res.status(data.statusCode).json({
          success: true,
          message: data.message,
          data: data.data
        })

        log_obj["message"] = data.message || "Internal server error"
        log_obj["action"] = "DELETE"
        log_obj["success"] = true
        log_obj["user"] = req.user.username
        next();

      })
      .catch(err => {
        res.status(err.statusCode).json({
          success: false,
          message: err.message,
          stacktrace: err
        })
        // log_obj["data"] = work
        log_obj["message"] = err.message || "Internal server error"
        log_obj["action"] = "DELETE"
        log_obj["success"] = false
        log_obj["user"] = req.user.username
        next();
      })
  }, loggervalidator(logger, log_obj));

  router.post('/viewlog', passport.authenticate('jwt', { session: false }), (req, res) => {
    const filename = "./server.log";
    let max_size = parseInt(req.query.max_size);
    console.log(max_size)
    const file_data = [];
    let userType = req.user.userType;
    if (userType == "admin") {

      fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
          // may be filename does not exists?
          res.status(500).send(err);
        } else {
          data = data.split("\n");
          console.log(max_size)
          if (max_size > data.length)
            max_size = data.length;
          let c = 0
          for (let i = data.length - 1; i >= 0; i--) {
            if (c == max_size)
              break
            file_data.push(data[i]);
            c += 1
          }
          return res.status(200).send({
            statuScode: 200,
            success: true,
            message: "log data",
            data: file_data
          });
        }
      });
    } else {
      return res.status(401).send({
        statuScode: 401,
        success: false,
        message: "user not allowed to view logs"
      })
    }

  })
}