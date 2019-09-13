"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _express = require("express");var _express2 = _interopRequireDefault(_express);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var router = _express2.default.Router();

// Import all the custom routes
var routes = [
require("./modules/Users/Router"),
require("./modules/Todo/Router")];exports.default =



function (app) {
  // passing router object to all custom router object methods
  routes.forEach(function (routeObj) {
    routeObj.default(router);
  });

  // register routes to app
  app.use(router);
};