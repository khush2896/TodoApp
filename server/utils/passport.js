import passportJwt from "passport-jwt";
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt;
import { userModel } from "../modules/Users/Model";
import configuration from './../../config/config.json';



module.exports = (passport) => {

  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'secret';

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    userModel.findOne({ username: jwt_payload.username }, { password: 0, __v: 0, _id: 0 }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        let user_ = {
          username: user._doc.username,
          _id: user._doc._id,
          userType: user._doc.userType
        }
        return done(null, user_);
      } else {
        return done(null, false);
      }
    });
  }))
}