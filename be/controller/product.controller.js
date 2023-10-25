const Image = require("../models/Image");
const Products = require("../models/Products");



const Product = {
    createProduct : async (req,res) => {
        const {name,description,price,discountPercent,stock,brand,thumbnail,image} = req.body;
        const images = [];
        for (const img of image) {
            const newImage = await Image.create(img);
            images.push(newImage);
        } 
        const product = await Products.create({
            name,
            description,
            price,
            discountPercent,
            stock,
            brand,
            thumbnail,
            image: images, // Nhúng dữ liệu hình ảnh vào trường image
          });
          return res.status(200).json({
            message: "Product created successfully",
            data: product,
          });

    },
    
    getAllProduct: async (req,res) => {
        Products.find().then(data => {
            return res.status(200).json({
                message: "Get all product",
                data: data
            })
        }).catch(error => {
            return res.status(500).json(error)
        })
    },
    



    
}

module.exports = Product
