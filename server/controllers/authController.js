import User from '../schemas/user.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const register = async (req, res) => {
	
    try {
        
        // grab info from the request body 
        const { email, password} = req.body;

        console.log("Register endpoint reached");        

        // check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
        return res
            .status(400)
            .json({ error: "A user with this email address already exists." });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // store as a new user 
        const newUser = new User({
            email,
            password: hashedPassword,
            role: "admin"
        });

        await newUser.save();

        res.status(201).json({success: true, message:"Registration successful!" });
        
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ error: "Error registering user" });
    }
};

export const login = async (req,res) =>{

    try {
        
        // grab info from the request body 
        const { email, password, rememberMe} = req.body;

        console.log("Login endpoint reached");        

        // check if user already exists
        const existing = await User.findOne({ email });
        if (!existing) {
        return res
            .status(400)
            .json({ error: "A user with this email address does not exist." });
        }

        // compare received password to password stored in database
        const isPassword = await bcrypt.compare(password, existing.password);
        if (!isPassword) {
        return res.status(400).json({ error: "Invalid password" });
        }

        // Use rememberMe to set different token expiration times
        let tokenExpiration;

        if (rememberMe) {
            tokenExpiration = '7d'; // Token expires in 7 days if rememberMe is true
        } else {
            tokenExpiration = '1h'; // Token expires in 1 hour if rememberMe is false
        }        

        // Generate a JWT
        const token = jwt.sign(
            { email: existing.email, role: existing.role },
            process.env.JWT_SECRET,
            { expiresIn: tokenExpiration } // Adjust expiration based on rememberMe
        );

        // Set token as an HttpOnly cookie
        const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 :  60 * 60 * 1000; // 7 days or 24 hours

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge
        });      


        res.status(200).json({success: true, message:"Login successful!" });
        
    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ error: "Error logging in user" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true
        });
        res.status(200).json({ success: true, message: "Logout successful!" });
    } catch (error) {
        console.log("Error logging out user:", error);
        res.status(500).json({ error: "Error logging out user" });
    }
};

