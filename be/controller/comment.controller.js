const Products = require("../models/Products");
const Comment = require("../models/Comment");


const CommentController = {
    createComment: async (req,res) => {
        const {id} = req.params;
        const {title,body,user} = req.body;
        const comment =await Comment.create({title,body,user});
        
        Products.findById(id).then(data => {
            data.comment.push(comment._id);
            data.save();
            return res.status(201).json({
                message: "Comment create successfully",
                data: comment
            })
        }).catch(error => {
            return res.status(500).json(error)
        }) 
    }

    
}

module.exports = CommentController