import Joi from "joi";
import winston from "winston";
import logger from "../../config/config";

const validator = (req, res, next) => {

  const userInput = {
    username: req.body.username,
    password: req.body.password
  };

  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(6).max(20).required(),
    password: Joi.string().regex(/^[a-z A-Z 0-9]{6,16}$/).min(6).required()
  }).with("username", "password")

  Joi.validate(userInput, schema, (err, value) => {
    if (err === null)
      next();
    else {
      return res.status(400).json({
        success: false,
        message: "Joi validation error",
        stacktrace: err.details
      })
    }
  });


};



const loggervalidator = (logger, log_obj) => (req, res, next) => {
  if (log_obj["success"]) {
    logger.info(log_obj);
  }
  else {
    logger.error(log_obj)
  }
  next();
}

const taskValidator = (req, res, next) => {
  let work = req.body.work;
  if (work.length > 0) {
    next();
  } else {
    return res.status(400).json({
      status: 400,
      success: true,
      message: "task cannot be empty"
    })
  }
};

module.exports = {
  validator,
  loggervalidator,
  taskValidator
};
