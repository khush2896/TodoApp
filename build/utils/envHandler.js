'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _config = require('./../../config/config.json');var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function () {
    if (process.env.NODE_ENV === 'dev') {
        return {
            PORT: process.env.PORT || _config2.default.port.dev,
            dbUrl: _config2.default.db.dev };

    } else if (process.env.NODE_ENV === 'prod') {
        return {
            PORT: process.env.PORT || _config2.default.port.prod,
            dbUrl: _config2.default.db.prod };

    } else if (process.env.NODE_ENV === 'test') {
        return {
            PORT: process.env.PORT || _config2.default.port.test,
            dbUrl: _config2.default.db.test };

    } else {
        console.log('no environment selected');
        throw new Error('Select an environment - prod or dev');
    }
};