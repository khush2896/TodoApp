import mongoose from "mongoose";

const directorySchema = new mongoose.Schema({
  dir_type: {
    type: String
  },
  dir_name: {
    type: String
  },
  path: {
    type: String
  }

})

const directoryModel = mongoose.model("Directories", directorySchema);

const saveDirectory = directory => directory.save();

const findDir = (path, dir_name) => directoryModel.findOne({ path: path, dir_name: dir_name })

const findBypath = (path) => directoryModel.find({ path: { $regex: path } });

const findandRename = (path, path1) => directoryModel.findOneAndUpdate({ path: { $regex: path } }, { path: path1 })


module.exports = {
  directoryModel,
  saveDirectory,
  findDir,
  findBypath

}