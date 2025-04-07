import TaskModel from "./tasks.model";
import {CreateTaskDto} from "./create-task.dto";

const taskModel = TaskModel;

export const createTask = async (taskData: CreateTaskDto) => {
    const {title, description, status, user, assignee} = taskData;
    const newTask = new taskModel({
        title,
        description,
        status,
        user,
        assignee,
    });
    await newTask.save();
    return newTask;
};

export const getTasks = async (userId: string) => {
    return taskModel.find({
        $or: [
            {user: userId},
            {assignee: userId}
        ]
    }).populate('user').populate('assignee');
};

export const getTaskById = async (taskId: string) => {
    return taskModel.findById(taskId).populate('user').populate('assignee');
};

export const assignTask = async (taskId: string, assigneeId: string) => {
    return taskModel.findByIdAndUpdate(taskId, {assignee: assigneeId}, {new: true}).populate('user').populate('assignee');
};

export const markTaskAsCompleted = async (taskId: string) => {
    return taskModel.findByIdAndUpdate(taskId, {status: 'completed'}, {new: true}).populate('user').populate('assignee');
};
export const updateTask = async (taskId: string, taskData: CreateTaskDto) => {
    return taskModel.findByIdAndUpdate(taskId, taskData, {new: true}).populate('user').populate('assignee');
};

export const deleteTask = async (taskId: string) => {
    return taskModel.findByIdAndDelete(taskId);
};