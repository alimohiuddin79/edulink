import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['student', 'counselor', 'admin'],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        default: null,
    },
    desc: {
        type: String,
        default: null,
    },
    categories: {
        type: [String],
        default: null
    },
    timings: {
        type: [String],
        default: null
    },
    meetingRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meeting'
        }
    ],
    hiredCounselors: {
        type: Number,
        default: 0
    },
    admin: {
        type: Boolean,
        default: false,
    }
});

userSchema.index({ name: 'text', email: 'text' });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;