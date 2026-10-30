import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    profilepic: {
        type: String
    },

    gender: {
        type: String,
        enum: ["Male", "Female"]
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    },

    
    resetPasswordAttempts: {
        type: Number,
        default: 0
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

});

const UserModel = mongoose.model("Users", UserSchema, "Users");

export default UserModel;