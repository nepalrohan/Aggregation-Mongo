
import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    authorName:String,
    authorAddress:String,
    authorAge:Number,
    noofBooksWritten:Number
})


const Author = mongoose.model('Author', authorSchema);
export default Author;