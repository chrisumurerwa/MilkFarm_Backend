import UserModel from "../Model/userModel.js";
import asyncWrapper from "../Middleware/async.js";
import { otpGenerator } from "../utils/otp.js";
import {validationResult} from 'express-validator';
import {sendEmail} from '../utils/sendEmail.js';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import Token from "../Model/authModel.js";
import dotenv from "dotenv"
dotenv.config();
export const test = (req, res, next) => {
    res.status(200).json({message:'Hello Farmers!'});
}

export const SignUp=asyncWrapper(async(req,res,next)=>
{
// validation
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array());
        res.status(400).json(errors.array()[0].msg)
    }
    //checking if password match
    if(req.body.password !== req.body.confirmPassword)
        {
            res.status(400).json("Passwords do not match");
        }
    // checking  if user is already in using the email
    const FounderUser=await UserModel.findOne({email:req.body.email})
    if(FounderUser)
    {
        res.status(400).json("Email is already in using this email")
    };

    //harshing the user Password
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    //Generating otp generator
    const otp=otpGenerator();
    const otpExpirationDate= new Date().getTime()+(60*1000*5);
    //Recording the user to the database
    const newUser= new UserModel({
        Name:req.body.Name,
        email:req.body.email,
        password:hashedPassword,
        role:req.body.role,
        otp: otp,
        otpExpires:otpExpirationDate
    });
    

    if (!req.body.email) {
        return res.status(400).send('Email is required');
      }
      
    const savedUser= await newUser.save();
    const token = jwt.sign({id:savedUser.id,role:savedUser.role,email:savedUser.email},process.env.JWT_SECRET_KEY, {expiresIn:'1h'});
    // console.log(savedUser);
 await sendEmail(`req.body.email,"Verify your account",Your OTP is ${otp}`)
 if(savedUser)
 {
    return res.status(201).json({
        message:"User account created!",
        user:savedUser,
        token:token
    })
 }
});
export const Validateopt=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=  validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(400).json(errors.array()[0].msg)
    }
    // checking if given opt is stored in our database
    const FounderUser=await UserModel.findOne({otp:req.body.otp})
    if(!FounderUser)
    {
       res.status(401).json('Authorization denied');
    };
    // checking if otp is expired or not
    if(FounderUser.otp.expires < new Date().getTime())
    {
        res.status(401).json('OTP expired');
    }
    // Update the user to 
    FounderUser.verified = true;
    const savedUser = await FounderUser.save();
     // Generate a new token
     const newToken = jwt.sign(
        { email: savedUser.email, role: savedUser.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );
    if(savedUser)
    {
        return res.status(200).json({
            message:"User account verified!",
            user:savedUser,
            newToken
        })
    }

});
export const SignIn=asyncWrapper(async(req,res,next)=>
{
    // //validation 
    // const errors=validationResult(req)
    // if(!errors.isEmpty())
    // {
    //     res.status(400).json(errors.array()[0].msg)
    // }
    //find User
    const FoundUser=await UserModel.findOne({email:req.body.email})
    if(!FoundUser)
    {
        res.status(400).json('Invalid Email or password')

    };
    //Verify password
    const isPasswordVerified= await bcryptjs.compare(req.body.password.trim(),FoundUser.password)
    console.log(isPasswordVerified);
    if(!isPasswordVerified)
    {
        res.status(400).json('Invalid Password')
    }
    //Generate token
    const token = jwt.sign({id:FoundUser.id,email:FoundUser.email,Name:FoundUser.Name,role: FoundUser.role },process.env.JWT_SECRET_KEY, {expiresIn:'1h'});

    res.status(200).json({
        message:"Login successful",
        user:FoundUser,
        token:token
    });
});
 
export const getAllusers =  async (req, res, next) => {
    try{
        const getUsers = await UserModel.find();
        if(getUsers){
            return res.status(200).json({
                size: getUsers.length,
                getUsers
            })
        }
        
    }catch (error){
        next(error);  
    }}

export const Logout=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        res.status(400).json(errors.array()[0].msg)
    }

  
 // Assuming you have a field in your user model to store the token
  // For example, let's assume it's called 'token'
  
  //Clear the token from the database
  UserModel.token = null; // or any mechanism to invalidate the token
  await UserModel.save(); // Save the updated user to the database
//   Token.token = null; // or any mechanism to invalidate the token
//   await Token.save(); // Save the updated user to the database

  res.status(200).json({ message: 'Logout successful' });  
})

export const ForgotPassword=asyncWrapper(async(req,res,next)=>
{
    //validation 
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        res.status(400).json(errors.array()[0].msg)
    }
    //find User
    const FoundUser=await UserModel.findOne({email:req.body.email})
    if(!FoundUser)
    {
        res.status(400).json('Invalid Email or password')
    }
    //Generate token
    const token=jwt.sign({id:FoundUser.id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"})
    //Recording the token to the database
    await Token.create({
        token:token,
        user:FoundUser._id,
        expirationDate:new Date().getTime()+ (60*1000*5),
    });
    const link=`https://localhost:8080/reset-password?token=${token}&id=${FoundUser.id}`;
    const emailBody=`click on the link below  to reset your password \n\n${link}`;
    await sendEmail(req.body.email,"Reset your password",emailBody);

    res.status(200).json({
        message:"we sent you a reset password link on yourn email"
    });
});

export const ResetPassword = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array()[0].msg);
    };
    //checking if password match
    if(req.body.password !== req.body.confirmPassword)
        {
            res.status(401).json("Passwords do not match");
        }
    // Verify token
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
        res.status(401).json("Invalid token!");
    }
    const recordedToken = await Token.findOne({ token: req.body.token });
    if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
        res.status(401).json("Invalid token!");
    }
    if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
        res.status(401).json("Token expired!");
    }
    // Find user
    const foundUser = await UserModel.findById(req.body.id);
    if (!foundUser) {
        res.status(401).json("User not found!");
    };
    // Deleting the user token
    await Token.deleteOne({ token: req.body.token });
    // Harshing the user password
    const inputedPassword = await bcryptjs.hashSync(req.body.password, 10);
    // Updating the user password
    foundUser.password = inputedPassword;
    const savedUser = await foundUser.save();
    if (savedUser) {
        return res.status(200).json({
            message: "Your password has been reset!",
        })
    }
   });
   export const updateUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params.id; // Change from email to id
    const updatedData = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,  // Find user by ID instead of email
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({message:'User not found'});
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
});

  
export const deleteUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({message:'User not found'});
    }

   return res.status(200).json({
        message: "User deleted successfully"
    });
});
export const findUserByName = asyncWrapper(async (req, res, next) => {
    const { name } = req.query;

    const users = await UserModel.find({
        $or: [
            { Firstname: { $regex: name, $options: "i" } },  // Case-insensitive search
            { Lastname: { $regex: name, $options: "i" } }
        ]
    });

    if (!users.length) {
        res.status(404).json({message:'No user found with that name'});
    }

    res.status(200).json({
        size: users.length,
        users
    });
});