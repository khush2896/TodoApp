import { userModel, creatuser, fiduserByname } from "./Model";
import bcrypt from "bcryptjs";

const saveuser = (user) => {
  return fiduserByname(user.username)
    .then(data => {
      if (!data) {
        return bcrypt.genSalt(10)
      } else {
        return Promise.reject({
          statusCode: 409,
          message: "user already exists"
        })
      }
    })
    .then(salt => {
      return bcrypt.hash(user.password, salt)
    })
    .then(hash => {
      // newuser.password = hash;
      let newuser = new userModel({
        username: user.username,
        password: hash,

      });
      return creatuser(newuser)
    })
    .then(data => {
      if (data) {
        delete data._doc["password"];
        delete data._doc["_id"];
        // console.log(data._doc["_id"])
        return Promise.resolve({
          statusCode: 200,
          message: "user created sucessfully",
          data: data
        });
      } else {
        return Promise.reject({
          statusCode: 400,
          message: "error while creating a user",
        });
      }
    })
    .catch(err => {
      return Promise.reject({
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",
      });
    });
}

// Better anmes for function
const getUserByName = (username, password) => {
  let out_user = {}
  return fiduserByname(username)
    .then(user => {
      out_user = user._doc
      return bcrypt.compare(password, user.password)
    })
    .then(res => {
      if (res == true) {
        return Promise.resolve({
          statusCode: 200,
          message: "user validated  sucessfully",
          data: out_user
        });
      } else {
        return Promise.reject({
          statusCode: 400,
          message: "error while validating a user",
        });
      }
    })
    .catch(err => {
      console.log(err);
      return Promise.reject({
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",

      });
    });
}


// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(newuser.password, salt, (err, hash) => {
//     if (err) {
//       return err;
//     } else
//       newuser.password = hash;
//     return creatuser(newuser)
//       .then(data => {
//         if (data) {
//           return Promise.resolve({
//             statusCode: 200,
//             message: "user created sucessfully",
//             data: data
//           });
//         } else {
//           return Promise.reject({
//             statusCode: 400,
//             message: "error while creating a user",
//             data: data
//           });
//         }
//       })
//       .catch(err => {
//         return Promise.reject({
//           statusCode: err.statusCode || 500,
//           message: err.message || "Internal Server Error",
//         });
//       });

//   });
// });
// return createuser(newuser)



module.exports = {
  saveuser,
  getUserByName
}