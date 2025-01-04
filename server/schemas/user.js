import mongoose from "mongoose";

// for the embedded profiles
const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures usernames are unique across all users
    },
    imgUrl: {
        type: String,
        required: true,
    },
    isChildProfile: {
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define the main user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users can have the same email
    },
    password: {
        type: String,
        required: true,
    },
    rememberMe: {
        type: Boolean,
        required: false,
    },
    role: {
        type: String,
        required: true,
      },
    profiles: {
        type: [profileSchema], // Array of embedded profiles
        validate: {
            validator: function (profiles) {
                return profiles.length <= 5; // Maximum of 5 profiles
            },
            message: "A user can have a maximum of 5 profiles.",
        },
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);
// export the two mongoose models