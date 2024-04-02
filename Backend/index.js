import express from 'express';
import mongoose from "mongoose";
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from "./routes/user.js"
dotenv.config();

const port = process.env.PORT || 8000;


// Database connection
mongoose.set('strictQuery', false);
const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
             useNewUrlParser: true,
             useUnifiedTopology: true,
        });
        console.log("DB connected");
        
    } catch (error) {
        console.error("MongoDB database connection failed", error);
        
    }
};


app.get('/',(req,res)=>{
    res.json({message:'server is working'});
})



const corsOption = {
    origin: true
};

// middleware
app.use(cors(corsOption));
app.use(express.json());
app.use('/api/users' , userRoute);





app.listen(port, async () => {
    await mongoDB();
    console.log(`server is working on PORT ${port}`);
});
