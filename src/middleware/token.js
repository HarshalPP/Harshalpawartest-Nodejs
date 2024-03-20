// Purpose: Middleware for update the api and pass id from headers.
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserInfo } from '../models/usermodel.js';
dotenv.config();

// make a middeware for update the api and pass id from headers //
export const middlwareupdate = async (req, res, next) => {
    try{

        const Author=req.headers.AuthorId
        //checkAuthorid from models
        const checkAuthorid=await UserInfo.findOne({_id:Author})
        if(!checkAuthorid){
            return res.status(401).json({message:'Access Denied'})
        }

        res.status(200).json({message:'Access Granted'})
        next();


    }catch(error){
        console.log(error)
    
    }
}




