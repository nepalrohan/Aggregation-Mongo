import Product from "../models/product.js";
const data = [
  {
    category: "Electronics",
    name: "Wireless Headphones",
    price: 99.99,
    inStock: true,
    description:
      "Noise-canceling wireless headphones with Bluetooth 5.0 and 20-hour battery life.",
    noOfSales: 150, // Number of sales
    noOfReturns: 10, // Number of returns
  },
  {
    category: "Electronics",
    name: "Smartphone",
    price: 699.99,
    inStock: true,
    description:
      "Latest model smartphone with a 6.5-inch display, 128GB storage, and a powerful camera.",
    noOfSales: 80, // Number of sales
    noOfReturns: 5, // Number of returns
  },
  {
    category: "Home & Kitchen",
    name: "Electric Kettle",
    price: 45.5,
    inStock: true,
    description:
      "Stainless steel electric kettle with 1.7L capacity and fast boiling feature.",
    noOfSales: 120, // Number of sales
    noOfReturns: 3, // Number of returns
  },
  {
    category: "Home & Kitchen",
    name: "Blender",
    price: 39.99,
    inStock: false,
    description:
      "High-speed blender with multiple blending modes and a 1.5L jug.",
    noOfSales: 50, // Number of sales
    noOfReturns: 2, // Number of returns
  },
  {
    category: "Toys & Games",
    name: "Lego Set",
    price: 79.99,
    inStock: true,
    description:
      "500-piece Lego building set for kids and adults, featuring vehicles and buildings.",
    noOfSales: 200, // Number of sales
    noOfReturns: 15, // Number of returns
  },
  {
    category: "Toys & Games",
    name: "Board Game",
    price: 25.0,
    inStock: true,
    description: "Fun strategy board game for 2-4 players, ages 8+.",
    noOfSales: 60, // Number of sales
    noOfReturns: 4, // Number of returns
  },
  {
    category: "Clothing",
    name: "Men's T-Shirt",
    price: 19.99,
    inStock: true,
    description:
      "Comfortable cotton t-shirt available in various sizes and colors.",
    noOfSales: 500, // Number of sales
    noOfReturns: 30, // Number of returns
  },
  {
    category: "Clothing",
    name: "Women's Jacket",
    price: 89.99,
    inStock: false,
    description:
      "Warm winter jacket with insulated lining and water-resistant exterior.",
    noOfSales: 30, // Number of sales
    noOfReturns: 1, // Number of returns
  },
  {
    category: "Books",
    name: "Fiction Novel",
    price: 12.99,
    inStock: true,
    description: "A best-selling fiction novel, gripping and full of suspense.",
    noOfSales: 400, // Number of sales
    noOfReturns: 25, // Number of returns
  },
  {
    category: "Sports & Outdoors",
    name: "Yoga Mat",
    price: 29.99,
    inStock: true,
    description:
      "Non-slip yoga mat with cushioned support, ideal for yoga and fitness exercises.",
    noOfSales: 150, // Number of sales
    noOfReturns: 8, // Number of returns
  },
];

export const addProduct = async (req, res) => {
  try {
    const newproducts = await Product.insertMany(data);
    if (!newproducts) {
      return res.json({ message: "Production add failed" });
    }

    return res.json({
      message: "success",
      data: newproducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getStockProduct = async (req, res) => {
  try {
    const stockproduct = await Product.aggregate([
      {
        $match: {
          inStock: true,
        },
      },
    ]);

    if (!stockproduct || stockproduct.length < 1) {
      return res.json({ message: "No product on stock" });
    }

    return res.json({
      message: " success",
      stockProductList: stockproduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const categorizedProduct = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          productCount: {
            $sum: 1,
          },
          averagePrice: {
            $avg: "$price",
          },
        },
      },
    ]);

    if (!categorizedProduct || categorizedProduct.length < 1) {
      return res.json({ message: "No product for this category" });
    }

    return res.json({
      message: " success",
      categoryProductlist: categorizedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};




export const detailedAnalyticsforproduct = async (req, res) => {
  try {
    const analyticsofProduct = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          averagesell: {
            $avg: "$noOfSales",
          },
          averageReturn: {
            $avg: "$noOfReturns",
          },
          NoOfProducts: {
            $sum: 1,
          },
          TotalSell: {
            $sum: "$noOfSales",
          },
          TotalReturn: {
            $sum: "$noOfReturns",
          },
          Revenue: {
            $sum: { $multiply: ["$price", "$noOfSales"] },
          },
        },
      },
    ]);

    if (!analyticsofProduct) {
      return res.json({ message: "No product found" });
    }

    return res.json({
      message: "success",
      analyticsofProducts: analyticsofProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sortProduct = async (req, res) => {
  try {
    const { sortquery, categry } = req.query;

    let sortType;

    if(sortquery==='highTolow'){
      sortType=-1;
    }
    else if(sortquery==='lowTohigh'){
      sortType=1;
    }

    const getSortedProducts = await Product.aggregate([


      {

        $match:{
          category:categry
        }
      },
      {




        $sort:{
          price:sortType
        }
      }


    ]);

    if(!getSortedProducts){
      return res.json({message:'No product found'})
    }

    return res.json({
      message:'success',
      sortedData:getSortedProducts
    })
  } catch (error) {
    console.log(error);
  }
};
