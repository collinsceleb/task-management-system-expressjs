import {Request, Response} from 'express'
import * as taskService from './tasks.service'
import {CreateTaskDto} from "./create-task.dto";

export const createTask = async (req: Request, res: Response) => {
    try {
        const taskData: CreateTaskDto = req.body
        const task = await taskService.createTask({...taskData, user: req.user?.id})
        res.status(201).json({task, message: 'Task Created Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error creating task', error})
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getTasks(req.user?.id)
        res.status(200).json({tasks, message: 'Tasks Fetched Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error fetching tasks', error})
    }
}
export const getTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.params.taskId
        const task = await taskService.getTaskById(id)
        res.status(200).json({task, message: 'Task Fetched Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error fetching task', error})
    }
}

export const assignTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId
        const assigneeId = req.body.assigneeId
        const task = await taskService.assignTask(taskId, assigneeId)
        res.status(200).json({task, message: 'Task Assigned Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error assigning task', error})
    }
}
export const markTaskAsCompleted = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId
        const task = await taskService.markTaskAsCompleted(taskId)
        res.status(200).json({task, message: 'Task Marked as Completed Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error marking task as completed', error})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId
        const taskData: CreateTaskDto = req.body
        const task = await taskService.updateTask(taskId, taskData)
        res.status(200).json({task, message: 'Task Updated Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error updating task', error})
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId
        const task = await taskService.deleteTask(taskId)
        res.status(200).json({task, message: 'Task Deleted Successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error deleting task', error})
    }
}