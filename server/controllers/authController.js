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

