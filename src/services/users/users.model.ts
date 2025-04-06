import mongoose, {Schema, Document, model} from 'mongoose';
import * as argon2 from 'argon2';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password);
    next();
});

UserSchema.methods.comparePassword = async function (plainPassword: string) {
    return await argon2.verify(this.password, plainPassword);
};

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;