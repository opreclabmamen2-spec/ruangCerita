import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import adminRouter from "./routes/adminRoutes.js";

// app setup
const app = express();
const port = 4000;

dotenv.config();
connectDB();


// middleware   
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running');
})

// APi endpoints 
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter)

app.listen(port, () => console.log('Server is running on port',  port));
