import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const port=3000;
const app =express();

import productRoute from './routes/product-route.js'

import authorRoute from './routes/author-route.js'
import bookRoute from './routes/book-route.js'
import authRoute from './routes/authRoutes.js'
import homeRoute from './routes/homeRoute.js'
import adminRoute from './routes/adminRoute.js'
import imageRoute from './routes/imageRoute.js'




mongoose.connect(process.env.database_url).then(res=>{
    console.log('Database connected successfully')
}).catch(err=>console.log('Error during database connection', err))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1/product', productRoute);
app.use('/api/v1/author', authorRoute);
app.use('/api/v1/book', bookRoute);
app.use('/api/v1/user', authRoute);
app.use('/api/v1/home', homeRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/image', imageRoute)






app.listen(port, ()=>{
    console.log(`Server started at port: ${port}`)
})