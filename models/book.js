
import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema({

    bookname:String,
    bookPrice:Number,
    bookCategory:String,
    bookAuthor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }
})



const Book = mongoose.model('Book', bookSchema);
export default Book;