"use strict";var _Model = require("./Model");

var findTaskandSave = function findTaskandSave(work, status, username) {
    return (0, _Model.findTask)(work, status, username).
    then(function (data) {
        if (data) {
            return Promise.reject({
                statusCode: 400,
                message: "task already exist in todolist with status false" });

        } else {
            var Task = new _Model.TaskModel({
                work: work,
                creator: username });

            return (0, _Model.saveTask)(Task);
        }

    }).
    then(function (data) {
        if (data) {
            return Promise.resolve({
                statusCode: 200,
                message: "task added succesfully to todo list",
                data: data });

        } else {
            return Promise.reject({
                statusCode: 400,
                message: "error occured with adding the task" });

        }
    }).
    catch(function (err) {
        return Promise.reject({
            statusCode: err.statusCode || 400,
            message: err.message || "error occured with adding the task" });

    });
};

var listalltask = function listalltask(username) {
    return (0, _Model.listTask)(username).
    then(function (data) {
        if (data) {
            return Promise.resolve({
                statusCode: 200,
                message: "list of all task that exist in todolist ",
                data: data });

        } else {
            return Promise.reject({
                statusCode: 400,
                message: "error in fecthing all task" });


        }
    }).
    catch(function (err) {
        return Promise.reject({
            statusCode: err.statusCode || 500,
            message: err.message || "internall server error" });

    });
};
var findStatusandUpdate = function findStatusandUpdate(taskId, work, username) {
    return (0, _Model.checkstatus)(taskId).
    then(function (data) {

        if (username == data._doc.creator) {
            if (data._doc.status == true) {
                return Promise.reject({
                    statusCode: 400,
                    message: "cannot update the task as it is already done" });

            } else {
                return (0, _Model.updateTask)(taskId, work);
            }
        } else {
            return Promise.reject({
                statusCode: 401,
                message: "unauthorized, not the creator" });

        }
    }).
    then(function (data) {
        if (data) {
            return Promise.resolve({
                statusCode: 200,
                message: "task updated succcesfully in the todolist",
                data: data });

        } else {
            return Promise.reject({
                statusCode: 400,
                message: "task cannot be updated in todlist" });

        }
    }).
    catch(function (err) {
        return Promise.reject({
            statusCode: err.statusCode || 500,
            message: err.message || "internall server error" });

    });
};

var updateStatus = function updateStatus(taskId, username) {
    return (0, _Model.changeStatus)(taskId, username).
    then(function (data) {
        if (data) {
            if (username == data._doc.creator) {
                return Promise.resolve({
                    statusCode: 200,
                    message: "status of a task in todolist updated successfully",
                    data: data });

            } else {
                return Promise.reject({
                    statusCode: 401,
                    message: "unauthorized, not the creator" });


            }
        } else {
            return Promise.reject({
                statusCode: 400,
                message: "errror occured while updating status" });

        }
    }).
    catch(function (err) {
        return Promise.reject({
            statusCode: err.statusCode || 500,
            message: err.message || "Internal Server Error",
            err: err });

    });
};

var findStatusandDelete = function findStatusandDelete(taskId, username) {
    return (0, _Model.checkstatus)(taskId, username).
    then(function (data) {
        if (username == data._doc.creator) {
            if (data.status == false) {
                return Promise.reject({
                    statusCode: 400,
                    message: "cannot delete task from todolist as status is false" });

            }if (!data) {
                return Promise.reject({
                    statusCode: 400,
                    message: "no such data found" });

            } else {
                return (0, _Model.removeTask)(taskId);
            }
        } else {
            return Promise.reject({
                statusCode: 401,
                message: "unauthorized, not the creator" });

        }
    }).
    then(function (data) {
        if (data) {
            return Promise.resolve({
                statusCode: 200,
                message: "task deleted succesfully",
                data: data });

        } else {
            return Promise.reject({
                statusCode: 400,
                message: "cannot be deleted" });

        }
    }).

    catch(function (err) {
        return Promise.reject({
            statusCode: err.statusCode || 500,
            message: err.message || "Internal sever error" });

    });
};


module.exports = {
    findTaskandSave: findTaskandSave,
    listalltask: listalltask,
    findStatusandUpdate: findStatusandUpdate,
    updateStatus: updateStatus,
    findStatusandDelete: findStatusandDelete };