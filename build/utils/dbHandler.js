'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _envHandler = require('./envHandler');var _envHandler2 = _interopRequireDefault(_envHandler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var dburl = (0, _envHandler2.default)().dbUrl;

var db = _mongoose2.default.connection;
_mongoose2.default.Promise = global.Promise;

db.on('error', function () {
    console.log('error while communicating to database ');
});exports.default =

{
    openConnection: openConnection,
    closeConnection: closeConnection };


function openConnection() {
    return _mongoose2.default.connect(dburl, { useMongoClient: true });
}

function closeConnection(callback) {
    db.close().then(function () {
        console.log('db disconnected');
        callback();
    });
}