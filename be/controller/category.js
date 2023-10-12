const Category = require("../models/categories");



const category = {
    getAllCategory : async (req,res) => {
        try {
            const allCategory = await Category.find({});
            return res.status(200).json(allCategory);
            
        } catch (error) {
            throw new Error("error in get category");
        }
    }

    
}

module.exports = category