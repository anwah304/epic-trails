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

    // ✅ جديد
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

});

const UserModel = mongoose.model("Users", UserSchema, "Users");

export default UserModel;