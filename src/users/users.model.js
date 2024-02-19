import { Schema, model } from 'mongoose';

// Definición del esquema del usuario
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student_role', 'teacher_role'],
        default: 'student_role'
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


const User = model('User', userSchema);

export default User;
