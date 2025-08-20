import cloudinary from "../lib/cloudnary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {nickname, email, password} = req.body
    try {

        if(!nickname || !email || !password) {
            return res.status(400).json({ message: "All fields must be filled"});
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({ message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = new User({
            nickname,
            email,
            password: hashedpassword
        });

        if(newuser) {
            // generate jwt token 
            generateToken(newuser._id, res);
            await newuser.save();

            res.status(201).json({
                _id: newuser._id,
                nickname: newuser.nickname,
                email: newuser.email,
                profilepic: newuser.profilepic 
            });

        } else {
            res.status(400).json({ message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in sign in controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email});

        if(!email || !password) {
            return res.status(400).json({ message: "All fields must be filled"});
        }

        if(!user) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            nickname: user.nickname,
            email: user.email,
            profilepic: user.profilepic 
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilepic} = req.body;
        const userId = req.user._id

        if(!profilepic) {
            return res.status(400).json({ message: "Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic);

        console.log(uploadResponse);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilepic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in update profile controller", error.message);
        return res.status(500).json({ message: "Internal server error"});
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check auth controller", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
};