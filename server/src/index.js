import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import '@dotenvx/dotenvx/config';
import connectDB from './dbConnect/dbConnection.js';
import { app } from './app.js';

app.get("/", (req, res) => {
  res.send("Backend working!");
});


connectDB().then(() => {
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("mongoDB connection failed or something went wrong!!!",err);
})





