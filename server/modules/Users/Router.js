import { validator } from "../../Validators/users"
import { saveuser, getUserByName } from "./Handler";
import jwt from "jsonwebtoken";
// import authenticate from "../../utils/passport";
import passport from "passport";

import { loggervalidator } from "../../Validators/users";
import logger from "../../../config/config"


let log_obj = {};
export default router => {
  router.post('/user/register', validator, (req, res, next) => {
    let user = {

      username: req.body.username,
      password: req.body.password,
    };

    return saveuser(user)
      .then(data => {
        // delete data.password;
        res.status(data.statusCode).json({
          success: true,
          message: data.message,
          data: data.data
        });

        log_obj["message"] = data.message || "Internal server error"
        log_obj["action"] = "USER REGISTER"
        log_obj["success"] = true
        log_obj["user"] = user.username
        next();
      })
      .catch(err => {
        res.status(err.statusCode).json({
          success: false,
          message: err.message || "INternal server error",
        });
        log_obj["message"] = err.message || "Internal server error"
        log_obj["action"] = "ERROR IN REGISTERING USER"
        log_obj["success"] = false
        log_obj["user"] = user.username
        next();
      })
  }, loggervalidator(logger, log_obj));

  router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    return getUserByName(username, password)
      .then(data => {
        const jwt_token = jwt.sign({ username: username, userType: data.data.userType }, 'secret', { expiresIn: '1d' })
        res.status(data.statusCode).json({
          success: true,
          message: data.message,
          jwt_token: jwt_token
        });
        log_obj["message"] = data.message || "Internal server error"
        log_obj["action"] = "LOGIN"
        log_obj["success"] = true
        log_obj["user"] = username
        next();
      })
      .catch(err => {
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "INternal server error",
        });
        log_obj["message"] = err.message || "Internal server error"
        log_obj["action"] = "ERROR IN LOGGING"
        log_obj["success"] = false
        log_obj["user"] = username
        next();
      });
  }, loggervalidator(logger, log_obj));

  router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).send({
      success: true,
      message: "user profile details",
      user: req.user
    })
    log_obj["message"] = "user profile details"
    log_obj["action"] = "autheticate"
    log_obj["success"] = true
    log_obj["user"] = req.user.username
    next();
  }, loggervalidator(logger, log_obj));
}