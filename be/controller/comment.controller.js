const Products = require("../models/Products");
const Comment = require("../models/Comment");


const CommentController = {
    createComment: async (req, res) => {
        const { id } = req.params;
        const { title, body, user } = req.body;
        const comment = await Comment.create({ title, body, user });

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
    },
    getCommentByProduct: async (req, res) => {
        const { productId } = req.params;
        const Product = await Products.findById(productId).populate({
            path: 'comment',
            populate: {
                path: 'user',
                select: 'username'
            },
        }).exec();
        const Comments = []
        Product.comment.forEach((comment) => {
            const objectComment = {
                _id: comment._id,
                body: comment.body,
                title: comment.title,
                userId: comment.user._id,
                username: comment.user.username,
            }
            Comments.push(objectComment);
        });
        return res.status(200).json({
            message: "get comment Successfully",
            data: Comments
        })
    }


}

module.exports = CommentController