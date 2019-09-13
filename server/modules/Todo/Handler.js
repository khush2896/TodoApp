import { TaskModel, saveTask, findTask, listTask, checkstatus, updateTask, changeStatus, removeTask } from "./Model";

const findTaskandSave = (work, status, username) => {
    return findTask(work, status, username)
        .then(data => {
            if (data) {
                return Promise.reject({
                    statusCode: 400,
                    message: "task already exist in todolist with status false"
                })
            } else {
                const Task = new TaskModel({
                    work: work,
                    creator: username
                });
                return saveTask(Task);
            }

        })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    statusCode: 200,
                    message: "task added succesfully to todo list",
                    data: data
                })
            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: "error occured with adding the task"
                });
            }
        })
        .catch(err => {
            return Promise.reject({
                statusCode: err.statusCode || 400,
                message: err.message || "error occured with adding the task"
            });
        });
}

const listalltask = (username) => {
    return listTask(username)
        .then(data => {
            if (data) {
                return Promise.resolve({
                    statusCode: 200,
                    message: "list of all task that exist in todolist ",
                    data: data
                })
            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: "error in fecthing all task"

                })
            }
        })
        .catch(err => {
            return Promise.reject({
                statusCode: err.statusCode || 500,
                message: err.message || "internall server error"
            });
        });
}
const findStatusandUpdate = (taskId, work, username) => {
    return checkstatus(taskId)
        .then(data => {


            if (username == data._doc.creator) {
                if (data._doc.status == true) {
                    return Promise.reject({
                        statusCode: 400,
                        message: "cannot update the task as it is already done"
                    })
                } else {
                    return updateTask(taskId, work)
                }
            } else {
                return Promise.reject({
                    statusCode: 401,
                    message: "unauthorized, not the creator"
                })
            }

        })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    statusCode: 200,
                    message: "task updated succcesfully in the todolist",
                    data: data
                })
            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: "task cannot be updated in todlist"
                })
            }
        })
        .catch(err => {
            return Promise.reject({
                statusCode: err.statusCode || 500,
                message: err.message || "internall server error"
            });
        })
}

const updateStatus = (taskId, username) => {
    return changeStatus(taskId, username)
        .then(data => {
            console.log(data)
            if (data._doc.status == false) {
                if (username == data._doc.creator) {
                    return Promise.resolve({
                        statusCode: 200,
                        message: "status of a task in todolist updated successfully",
                        data: data
                    })
                } else {
                    return Promise.reject({
                        statusCode: 401,
                        message: "unauthorized, not the creator"
                    })

                }
            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: "status already set to true"
                    // "errror occured while updating status"
                })
            }
        })
        .catch(err => {
            return Promise.reject({
                statusCode: err.statusCode || 500,
                message: err.message || "Internal Server Error",
                err: err
            })
        })
}

const findStatusandDelete = (taskId, username) => {
    return checkstatus(taskId, username)
        .then(data => {
            if (!data) {
                return Promise.reject({
                    statusCode: 400,
                    message: "no such data found"
                })
            }
            if (username == data._doc.creator) {
                if (data.status == false) {
                    return Promise.reject({
                        statusCode: 400,
                        message: "cannot delete task from todolist as status is false"
                    })
                }
                // if (data.length == 0) {
                //     return Promise.reject({
                //         statusCode: 400,
                //         message: "no such data found"
                //     })
                // }
                else {
                    return removeTask(taskId)
                }
            } else {
                return Promise.reject({
                    statusCode: 401,
                    message: "unauthorized, not the creator"
                })
            }


        })
        .then(data => {

            if (data) {
                return Promise.resolve({
                    statusCode: 200,
                    message: "task deleted succesfully",
                    data: data
                })
            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: "cannot be deleted"
                })
            }


        })

        .catch(err => {
            return Promise.reject({
                statusCode: err.statusCode || 500,
                message: err.message || "Internal sever error"
            })
        })
}


module.exports = {
    findTaskandSave,
    listalltask,
    findStatusandUpdate,
    updateStatus,
    findStatusandDelete
}