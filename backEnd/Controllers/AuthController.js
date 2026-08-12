const UserModel = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
            if (user) {
            return res.status(409).json({
                message: "User already exists, you can proceed to login only.",
                success: false
            });
        }

        // Create new user
        const userModel = new UserModel({
            name,
            email
        });

        // Hash password
        userModel.password = await bcrypt.hash(password, 10);

        // Save user
        await userModel.save();

        return res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error("Signup Error:", err);

        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        const errorMessage = "Autrhentication failed Email or password is wrong";
            if (!user) {
            return res.status(403)
            .json({message: errorMessage,success: false});
        }
        const isPasswordEqual=await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
             return res.status(403)
            .json({message: errorMessage,success: false});
        }
        const jwtToken=jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

        return res.status(200).json({
            message: "login SuccessFull successful",
            success: true,
            jwtToken,
            email,
            name:user.name
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};








