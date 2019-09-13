import { directoryModel, saveDirectory, findDir, findBypath } from "./Model";
import { dirname } from "path";

const createDirectory = (dir) => {
  let path_1 = dir.path;
  let dir_name2 = dir.dir_name;
  let type = dir.dir_type;
  if (path_1 == null) {

    return findDir(path_1, dir_name2)
      .then(data => {
        // console.log("heyyy", data)
        if (data) {
          return Promise.reject({
            statusCode: 400,
            message: "data already exist with null path",
          })
        }
        else {
          // console.log("heyyy")
          let directory = new directoryModel({
            dir_type: dir.dir_type,
            dir_name: dir.dir_name,
            path: dir.path
          })
          return saveDirectory(directory)
        }

      })
      .then(data => {
        if (data) {
          return Promise.resolve({
            statusCode: 200,
            message: "directory added successfully",
            data: data
          })
        } else {
          return Promise.reject({
            statusCode: 400,
            message: "error occured while adding a dir",

          })

        }
      })
      .catch(err => {
        return Promise.reject({
          statusCode: err.statusCode || 500,
          message: err.message || "Internal server Error"
        });
      });


  }
  else {
    let arr = path_1.split('/');
    let path_2 = arr.slice(0, arr.length - 1);
    let path_3 = path_2.join('/')
    let dir_name1 = arr[arr.length - 1];
    if (path_3 == "") {
      let path_4 = null;
      path_3 = path_4;
    }
    return findDir(path_3, dir_name1)
      .then(data => {
        if (!data) {
          return Promise.reject({
            statusCode: 404,
            message: "no such parent directory foundxxx",
            data: data
          })
        }
        if ((data._doc.dir_type == "FOLDER")) {
          return findDir(dir.path, dir.dir_name)

        } else {
          return Promise.reject({
            statusCode: 400,
            message: "directory cannot be craeted as parent is a file",
            data: data
          })
        }
      })
      .then(data => {
        // console.log("hereeeeee", data._doc.dir_type)
        // console.log("there", dir.dir_type)
        if (data) {
          return Promise.reject({
            statusCode: 400,
            message: "data already exists",
            data: data
          })
        } else {
          let directory = new directoryModel({
            dir_type: dir.dir_type,
            dir_name: dir.dir_name,
            path: dir.path
          })
          return saveDirectory(directory)
        }
      })
      .then(data => {
        if (data) {
          return Promise.resolve({
            statusCode: 200,
            message: "directory added sucessfully",
            data: data
          })
        }
        else {
          return Promise.reject({
            statusCode: 400,
            message: "error occured while adding",
          })

        }
      })
      .catch(err => {
        return Promise.reject({
          statusCode: err.statusCode || 500,
          message: err.message || "Internal server Error"
        });
      });
  }
}

const findAllDirectories = (path) => {

  return findBypath(path)
    .then(data => {
      // console.log("here", data)
      if (data) {
        return Promise.resolve({
          statusCode: 200,
          messsage: "list of all records match given regex",
          data: data
        })
      } else {
        return Promise.reject({
          statusCode: 400,
          message: "error occured while listing",
        })

      }
    })
    .catch(err => {
      return Promise.reject({
        statusCode: err.statusCode || 500,
        message: err.message || "Internal server Error"
      });
    });


}

module.exports = {
  createDirectory,
  findAllDirectories
}