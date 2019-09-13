"use strict";




var _passport = require("./utils/passport");var _passport2 = _interopRequireDefault(_passport);
var _envHandler = require("./utils/envHandler");var _envHandler2 = _interopRequireDefault(_envHandler);
var _dbHandler = require("./utils/dbHandler");var _dbHandler2 = _interopRequireDefault(_dbHandler);
var _errorHandler = require("./middlewares/errorHandler");var _errorHandler2 = _interopRequireDefault(_errorHandler);
var _routes = require("./routes");var _routes2 = _interopRequireDefault(_routes);
var _morgan = require("morgan");var _morgan2 = _interopRequireDefault(_morgan);
var _helmet = require("helmet");var _helmet2 = _interopRequireDefault(_helmet);
var _passport3 = require("passport");var _passport4 = _interopRequireDefault(_passport3);



var _bodyParser = require("body-parser");var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _express = require("express");var _express2 = _interopRequireDefault(_express);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}if (process.env.NODE_ENV === "prod") {require("babel-polyfill");} // import the env
// Common imports
var app = (0, _express2.default)();
// when env is dev, log via morgan
if (process.env.NODE_ENV === "dev") {
  app.use((0, _morgan2.default)("dev"));
}

// Use helmet
app.use((0, _helmet2.default)());

// parsing req/res body to json
app.use(_bodyParser2.default.json({ limit: "50mb" }));

//passport for authentication
app.use(_passport4.default.initialize());
app.use(_passport4.default.session());
(0, _passport2.default)(_passport4.default);

// for parsing the url encoded data using qs library
app.use(_bodyParser2.default.urlencoded({ limit: "50mb", extended: true }));

// Load the routes
(0, _routes2.default)(app);

// adding err handling middleware, this is a post-call middleware
(0, _errorHandler2.default)(app);

// open db connection before server starts
_dbHandler2.default.openConnection().then(
function (db_details) {
  console.log("Db is connected to " + db_details.db.s.databaseName);

  // start server on port
  app.listen((0, _envHandler2.default)().PORT, function () {
    console.log("server listening on " + (0, _envHandler2.default)().PORT + " ");
  });
},
function (err) {
  console.log("error in opening the connection", err);
});


// kill process when Ctrl+C is hit
process.on("SIGINT", function () {
  _dbHandler2.default.closeConnection(function () {
    console.log("bye bye !");
    process.exit();
  });
});