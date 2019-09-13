"use strict";var _mongoose = require("mongoose");var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var TaskSchema = new _mongoose2.default.Schema({
    work: {
        type: String,
        unique: true,
        required: true },

    status: {
        type: Boolean },

    createdAt: {
        type: Date },

    creator: {
        ref: "Users",
        type: String } });



TaskSchema.pre('save', function (next) {
    this.status = false;
    this.createdAt = new Date();
    next();
});

var TaskModel = _mongoose2.default.model("Tasks", TaskSchema);

var saveTask = function saveTask(task) {return task.save();};

var findTask = function findTask(work, status, username) {return TaskModel.findOne({ work: work, status: status, creator: username });};

var listTask = function listTask(username) {return TaskModel.find({ creator: username });};

var checkstatus = function checkstatus(taskId) {return TaskModel.findById(taskId);};

var updateTask = function updateTask(taskId, work) {return TaskModel.findByIdAndUpdate(taskId, { work: work }, { new: true });};

var changeStatus = function changeStatus(taskId) {return TaskModel.findByIdAndUpdate(taskId, { status: true }, { new: true });};

var removeTask = function removeTask(taskId) {return TaskModel.findByIdAndRemove(taskId);};


module.exports = {
    TaskModel: TaskModel,
    saveTask: saveTask,
    findTask: findTask,
    listTask: listTask,
    checkstatus: checkstatus,
    updateTask: updateTask,
    changeStatus: changeStatus,
    removeTask: removeTask };