import User from '../schemas/user.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const addProfile = async (req, res) => {
    try {
        const {username, imgUrl, isChildProfile} = req.body;

        // Extract email from the cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        let email;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            email = decoded.email;
        } catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user already has 5 profiles
        if (user.profiles.length >= 5) {
            return res.status(400).json({ error: "Maximum of 5 profiles reached" });
        }

        // Add the new profile
        user.profiles.push({ username, imgUrl, isChildProfile});
        await user.save();

        res.status(201).json({ success:true, message: "Profile added successfully", profiles: user.profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getProfiles = async (req, res) => {
    try {

        // Extract email from the cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        let email;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            email = decoded.email;
        } catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Find the user and return their profiles
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        console.log("Profiles sent:");
        
        res.status(200).json({ profiles: user.profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
