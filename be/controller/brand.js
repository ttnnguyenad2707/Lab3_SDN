const Brand = require("../models/brands");



const brand = {
    getAllBrand : async (req,res) => {
        try {
            const allCategory = await Brand.find({});
            return res.status(200).json(allCategory);
            
        } catch (error) {
            throw new Error("error in get brand");
        }
    }

    
}

module.exports = brand