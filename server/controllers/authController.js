import User from '../schemas/user.js'
import bcrypt from "bcrypt";

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
            password: hashedPassword
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

        // send the user a cookie if they want to be remembered 
        if (rememberMe) {
        res.cookie("rememberMe", "true", {
            httpOnly: true,
            maxAge: 604800000, // 7 days
        });
        }

        res.status(200).json({success: true, message:"Login successful!" });
        
    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ error: "Error logging in user" });
    }
};

