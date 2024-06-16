import { comparePassword, passwordHash } from '../Helpers/auth.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) =>{
    try{
        const { name,email,password } = req.body;

        const isRegistered = await User.findOne({email});
        if(isRegistered){
           return res.status(409).json({error:"Email is already exist"})
        }
        
        //password hash
        const hashedPassword = await passwordHash(password);

        const user = new User({
            name,
            email,
            password:hashedPassword,
        })

        await user.save();

        res.json({message:'Registered Successfully'})
        
        }catch(err){
        res.status(500).json({error:err.message})
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.json({error:'User not found'});
        }

        //match
        const match = await comparePassword(password, user.password)
        if(match){
            const token = await jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.json({token,user,message:'Logged successfully'})
        }

        if(!match){
            res.json({error:'Verify your email and password'})
        }
    }
    catch(err){
        console.log(err)
        res.json({error:err})
    }
}