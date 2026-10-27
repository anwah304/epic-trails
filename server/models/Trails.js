import mongoose from "mongoose";

const TrailSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: ["EASY", "MEDIUM", "HARD"],
        required: true
    },

    governorate: {
        type: String,
        enum: [
            "Muscat Governorate",
            "Dhofar Governorate",
            "Musandam Governorate",
            "Al Buraimi Governorate",
            "Ad Dakhiliyah Governorate",
            "North Al Batinah Governorate",
            "South Al Batinah Governorate",
            "North Ash Sharqiyah Governorate",
            "South Ash Sharqiyah Governorate",
            "Al Wusta Governorate",
            "Adh Dhahirah Governorate"
        ],
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    location: {
        type: String
    },

    lat: {
        type: String  
    },

    lng: {
        type: String  
    }

}, { timestamps: true });

const TrailModel = mongoose.model("Trails", TrailSchema, "Trails");

export default TrailModel;