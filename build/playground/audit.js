'use strict';var winston = require('winston');var _require =
require('winston-loggly-bulk'),Loggly = _require.Loggly;

winston.add(new Loggly({
  token: "TOKEN",
  subdomain: "SUBDOMAIN",
  tags: ["Winston-NodeJS"],
  json: true }));


winston.log('info', "Hello World from Node.js!");