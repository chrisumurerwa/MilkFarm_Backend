import {SignIn,SignUp,ResetPassword,ForgotPassword,Validateopt,Logout,test, getAllusers,updateUser,findUserByName,deleteUser} from "../controller/UserController.js"
import express from 'express';
import { signUpValidation,signInValidation,otpValidation,resetPasswordValidation,forgotpasswordValidation, } from '../utils/validation.js';
import {authenticateToken,authorize} from "../Middleware/authenticateToken.js"
const route= express.Router();
route.get("/Test",test)
route.post('/signup',signUpValidation,SignUp)
route.post('/signin',signInValidation,SignIn)
route.get('/listAll',getAllusers)
route.post('/resetpassword',resetPasswordValidation,ResetPassword)
route.post('/forgotpassword',forgotpasswordValidation,ForgotPassword)
route.post('/verify',Validateopt)
route.post('/logout',Logout)
route.put('/update/:id',updateUser)
route.delete('/delete/:id',deleteUser)
route.get('/search/:id',findUserByName)
export default route;