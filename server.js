import dotenv from "dotenv";
dotenv.config({path: './.env'});
import express from "express";
import mongoose from "mongoose";
import urlRoutes from "./routes/url.js";


const app = express();
app.use(express.json());
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
// Connect to MongoDB
mongoose.connect(DB).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Routes
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
