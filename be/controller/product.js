const Product = require("../models/products")



const product = {
    getAllProduct : async (req,res) => {
        try {
            const allProduct =await Product.find({});
            return res.status(200).json(allProduct);
        } catch (error) {
            throw new Error("Error in get product")
        }
    
        
    },

    searchByTitle : async (req,res) => {
        try {
            const {title} = req.body;
            const ProductResult =await Product.find({title: title});
            return res.status(200).json(ProductResult)
        } catch (error) {
            throw new Error("Error in search product")
            
        }
        

    },
    createNewProduct : async (req,res) => {
        try {
            const {id,title,price,discountPercentage,rating,stock,brand,category} = req.body;
            const newProduct = await Product.create({id,title,price,discountPercentage,rating,stock,brand,category});
            return res.status(201).json(newProduct);
        } catch (error) {
            throw new Error("Error in create product")
        }
    },
    filterProductByBrand : async (req,res) => {
        try {
            const {id} = req.body;
            const ProductResult = await Product.find({brand: id});
            return res.status(200).json(ProductResult);
        } catch (error) {
            throw new Error("Error in filter product")
        }
    }

    
}

module.exports = product