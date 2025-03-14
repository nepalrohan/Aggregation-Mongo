import express from "express";
import mongoose from "mongoose";
const port=3000;
const app =express();

import productRoute from './routes/product-route.js'



mongoose.connect(database_url).then(res=>{
    console.log('Database connected successfully')
}).catch(err=>console.log('Error during database connection'))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1/product', productRoute);


app.listen(port, ()=>{
    console.log(`Server started at port: ${port}`)
})