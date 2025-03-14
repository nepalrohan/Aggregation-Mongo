import express from "express";
import mongoose from "mongoose";
const port=3000;
const app =express();

import productRoute from './routes/product-route.js'

import authorRoute from './routes/author-route.js'
import bookRoute from './routes/book-route.js'



mongoose.connect(database_url).then(res=>{
    console.log('Database connected successfully')
}).catch(err=>console.log('Error during database connection', err))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1/product', productRoute);
app.use('/api/v1/author', authorRoute);
app.use('/api/v1/book', bookRoute);




app.listen(port, ()=>{
    console.log(`Server started at port: ${port}`)
})