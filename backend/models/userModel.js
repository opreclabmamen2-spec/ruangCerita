import mongoose from "mongoose";
import {nanoid} from 'nanoid';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: () => nanoid(10),
        unique: true,
        required: true
    },
    name: {type: String, required: true, maxLength: 20},
    email: {type: String, required: true, unique: true, maxLength: 25},
    password: {type: String, required: true},
    role: {
        type: String, enum:["user", 'admin'], default: "user"
    }
})

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;