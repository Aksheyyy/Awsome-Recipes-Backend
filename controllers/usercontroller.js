const user = require('../models/usermodel')
const jwt = require('jsonwebtoken')


// register user
 exports.registerUser = async(req,res)=>{
    
    const {username,email,password} = req.body
    try {
        const existingUser =await user.findOne({email})

        if(existingUser){
            res.status(400).json("Username already exists")
        }else{
            const newUser = new user({
                username,email,password,isAdmin:false
            })
            await newUser.save()
            res.status(200).json("User registeration successfull")
        }
    } catch (error) {
        res.status(500).json("User registeration Failed!!")
    }
}

//login user
exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const ExistignUser = await user.findOne({email,password})
        if(ExistignUser){
            const token = jwt.sign({userId: ExistignUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({user:ExistignUser,token})
        }else{
            res.status(400).json("Incorrect email or password")
        }
    } catch (error) {
        res.status(500).json("User login failed!")
    }
}

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const Admin = await user.findOne({ email, password });
        if (Admin) {
            if (Admin.isAdmin) {
                const token = jwt.sign(
                    {admin: Admin.isAdmin },
                    process.env.JWT_PASSWORD
                );
                return res.status(200).json({ token });
            } else {
               
                return res.status(403).json({ message: "Authorized Entry only" });
            }
        } else {
            
            return res.status(404).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
