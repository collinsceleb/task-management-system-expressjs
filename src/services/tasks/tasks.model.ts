import mongoose, {Document, model, Schema} from 'mongoose';
import {IUser} from "../users/users.model";

export interface ITask extends Document {
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    dueDate?: Date;
    user: mongoose.Types.ObjectId; // Creator
    assignee?: mongoose.Types.ObjectId; // assigned to
}

const TaskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        description: String,
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        dueDate: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    },
    { timestamps: true }
);

const TaskModel = model<IUser>("Task", TaskSchema);

export default TaskModel;
