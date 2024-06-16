import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());


//ROUTES
app.use("/",routes);

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.URL
mongoose.connect(MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is connected with ${PORT}`)
    })
}).catch((error)=>{
    console.log("THE ERROR IS :",error)
})