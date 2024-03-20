import express from 'express'
import dotenv from 'dotenv'
import{connectDB} from './config/db.js'
dotenv.config()
const app=express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
import userRoute from './router/userRoutes.js'
import postRoute from './router/postRoutes.js'
import commentRoute from './router/commentRoutes.js'

//user Middleware
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);

// Database connection

const Connectdatabase=async()=>{
    const MONGO_URI=process.env.MONGO_URI;
    const PORT=process.env.PORT;
    try{
        
        await connectDB(MONGO_URI)
        app.listen(PORT,console.log(`Server is running on port ${PORT}`))
    }catch(error){
        console.log('Error:',error.message);
    }
}
Connectdatabase();