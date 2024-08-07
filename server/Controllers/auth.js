const prisma = require("../index")
const bcrypt = require('bcrypt')
const jwt  = require("jsonwebtoken")
const {promisify} = require("util");

const login = async(req,res)=>{
    try{
        const {email, password}  = req.body
        
        if(!email || !password){
            return res.status(404).json({message:"Need the User name and password"})
        }
        
        const user = await prisma.user.findUnique({where:{email}})
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const result = await bcrypt.compare(password,user.password)
       
        if(!result){
            return res.status(401).json({message:"Please enter the correct password"})
        }
        
        const token = jwt.sign({
                userId: user.id
            }, 
            process.env.JWT_SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRY_DAY
        });

        const options = {
            expires : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY_DAY* 60 * 60 * 1000),
            httpOnly:true
        }
        
        res.cookie("Authentication",token,options)
        
        return res.status(200).json({message: "Login successful"})

    }catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
}

const logout = (req,res)=>{
    const token = (req.cookies.Authentication);
        
    if(token){
        res.cookie("Authentication","")
        return res.status(200).json({message: "Logout successful"})
    }
    
}

const protection = async(req,res,next)=>{
    const token = (req.cookies.Authentication);
    
    try{
        if (!token) {
            return res.status(400).json({
                message: "You have being logged out."
            });
        }
        
        const {userId} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)

        const user = await prisma.user.findUnique({where:{id:userId}})
        
        if (!user) {
            return res.status(401).json({
                message: "The user doesn't not exists."
            });
        }
        
        req.userId = user.id;
        next()
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { login, protection, logout }