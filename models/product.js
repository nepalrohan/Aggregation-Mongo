import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    category:String,
    name:String,
    price:Number,
    inStock:Boolean,
    description:String
});


const Product = mongoose.model('Product', productSchema);
export default Product;