"use strict";var _passportJwt = require("passport-jwt");var _passportJwt2 = _interopRequireDefault(_passportJwt);


var _Model = require("../modules/Users/Model");
var _config = require("./../../config/config.json");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var JwtStrategy = _passportJwt2.default.Strategy;var ExtractJwt = _passportJwt2.default.ExtractJwt;



module.exports = function (passport) {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'secret';

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    _Model.userModel.findOne({ username: jwt_payload.username }, { password: 0, __v: 0 }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        var user_ = {
          username: user._doc.username,
          _id: user._doc._id,
          userType: user._doc.userType };

        return done(null, user_);
      } else {
        return done(null, false);
      }
    });
  }));
};