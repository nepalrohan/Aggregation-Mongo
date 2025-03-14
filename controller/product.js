import Product from "../models/product.js"

const data = [
    {
      "category": "Electronics",
      "name": "Wireless Headphones",
      "price": 99.99,
      "inStock": true,
      "description": "Noise-canceling wireless headphones with Bluetooth 5.0 and 20-hour battery life."
    },
    {
      "category": "Electronics",
      "name": "Smartphone",
      "price": 699.99,
      "inStock": true,
      "description": "Latest model smartphone with a 6.5-inch display, 128GB storage, and a powerful camera."
    },
    {
      "category": "Home & Kitchen",
      "name": "Electric Kettle",
      "price": 45.50,
      "inStock": true,
      "description": "Stainless steel electric kettle with 1.7L capacity and fast boiling feature."
    },
    {
      "category": "Home & Kitchen",
      "name": "Blender",
      "price": 39.99,
      "inStock": false,
      "description": "High-speed blender with multiple blending modes and a 1.5L jug."
    },
    {
      "category": "Toys & Games",
      "name": "Lego Set",
      "price": 79.99,
      "inStock": true,
      "description": "500-piece Lego building set for kids and adults, featuring vehicles and buildings."
    },
    {
      "category": "Toys & Games",
      "name": "Board Game",
      "price": 25.00,
      "inStock": true,
      "description": "Fun strategy board game for 2-4 players, ages 8+."
    },
    {
      "category": "Clothing",
      "name": "Men's T-Shirt",
      "price": 19.99,
      "inStock": true,
      "description": "Comfortable cotton t-shirt available in various sizes and colors."
    },
    {
      "category": "Clothing",
      "name": "Women's Jacket",
      "price": 89.99,
      "inStock": false,
      "description": "Warm winter jacket with insulated lining and water-resistant exterior."
    },
    {
      "category": "Books",
      "name": "Fiction Novel",
      "price": 12.99,
      "inStock": true,
      "description": "A best-selling fiction novel, gripping and full of suspense."
    },
    {
      "category": "Sports & Outdoors",
      "name": "Yoga Mat",
      "price": 29.99,
      "inStock": true,
      "description": "Non-slip yoga mat with cushioned support, ideal for yoga and fitness exercises."
    }
  ]
  

  export const addProduct = async (req, res)=>{

    try {
        

        const newproducts = await Product.insertMany(data);
        if(!newproducts) {
            return res.json({message:"Production add failed"})
        }

        return res.json({
            message:"success",
            data:newproducts
        })
    } catch (error) {
        console.log(error)
    }
  }


  export const getStockProduct = async (req, res)=>{
    try {

        const stockproduct = await Product.aggregate([
            {
                $match:{
                    inStock:true
                }
            }
        ])
        

        if(!stockproduct || stockproduct.length < 1){
            return res.json({message:'No product on stock'})
        }

        return res.json({
            message:' success',
            stockProductList:stockproduct
        })
    } catch (error) {
        console.log(error)
    }
  }


  export const getProductByCategory =async(req, res)=>{
    try {
const categorizedProduct = await Product.aggregate([
  {
    $group:{
        _id:"$category",
        productCount:{
            $sum:1
        },
        averagePrice:{
            $avg:"$price"
        }

    }
  }


])

if(!categorizedProduct || categorizedProduct.length < 1){
    return res.json({message:'No product for this category'})
}

return res.json({
    message:' success',
    categoryProductlist:categorizedProduct
})

    } catch (error) {
        console.log(error)
    }
  }



  