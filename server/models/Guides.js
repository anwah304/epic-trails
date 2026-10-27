import mongoose from "mongoose";

const GuideSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    specialty: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String
    },
    gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
},

}, { timestamps: true });

const GuideModel = mongoose.model("Guides", GuideSchema, "Guides");

export default GuideModel;