const asyncHandler= require ("express-async-handler");
const User = require ("../models/userModel");
const jwt = require ("jsonwebtoken");
const bcrypt=require("bcrypt");
//@des Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
    res.status(400)
    throw new Error("User Already Registered")
    }
    
    //Hashing The Raw Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(`User Created ${newUser}`);
    if(newUser){
        res.status(201).json({_id: newUser.id,email: newUser.email});
    }       
    else{
        res.status(400);
        throw new Error("User Data is not Valid!")
    }

    res.json({message: "Register the User"});
})

//@des Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email, !password){
        throw new Error("All Field are Madatory");
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACESS_TOKEN_SECRET,
            {
                expiresIn:"8m"
            }
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})


//@des Current User
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user);
})

module.exports ={registerUser, loginUser, currentUser};