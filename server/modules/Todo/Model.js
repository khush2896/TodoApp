import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    work: {
        type: String
        // unique: true,
        // required: true
    },
    status: {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    creator: {
        ref: "Users",
        type: String
    }
});

TaskSchema.pre('save', function (next) {
    this.status = false;
    this.createdAt = new Date();
    next();
})

const TaskModel = mongoose.model("Tasks", TaskSchema);

const saveTask = task => task.save();

const findTask = (work, status, username) => TaskModel.findOne({ work: work, status: status, creator: username });

const listTask = (username) => TaskModel.find({ creator: username });

const checkstatus = (taskId) => TaskModel.findById(taskId);

const updateTask = (taskId, work) => TaskModel.findByIdAndUpdate(taskId, { work: work }, { new: true });

const changeStatus = (taskId) => TaskModel.findByIdAndUpdate(taskId, { status: true }, { new: true });

const removeTask = (taskId) => TaskModel.findByIdAndRemove(taskId);


module.exports = {
    TaskModel,
    saveTask,
    findTask,
    listTask,
    checkstatus,
    updateTask,
    changeStatus,
    removeTask

}
