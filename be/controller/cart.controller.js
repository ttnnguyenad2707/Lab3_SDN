const Cart = require("../models/Cart");
const Products = require("../models/Products");

const cartController = {
    pushToCart: async (req, res) => {
        const { user, product } = req.body;
        try {
            const cart = await Cart.findOne({ user: user });
            if (!cart) {
                await Cart.create({
                    discountTotal: 0,
                    totalProduct: 0,
                    totalQuantity: 0,
                    totalPrice: 0,
                    user: user
                }).then(async (cartNew) => {
                    const productFind = await Products.findById(product._id);

                    cartNew.product.push(productFind._doc);

                    cartNew.totalProduct += 1;
                    cartNew.totalQuantity += product.quantity;
                    cartNew.totalPrice += productFind._doc.price;
                    cartNew.discountTotal += productFind._doc.discountPercent;
                    await cartNew.save();
                    return res.status(200).json({
                        message: "Product added to cart successfully",
                        data: cartNew
                    })

                }).catch(error => {
                    return res.status(500).json({ message: "error push to cart" })

                })
            }
            const productFind = await Products.findById(product._id);

            cart.product.push(productFind._doc);

            cart.totalProduct += 1;
            cart.totalQuantity += product.quantity;
            cart.totalPrice += productFind._doc.price;
            cart.discountTotal += productFind._doc.discountPercent;
            await cart.save();
            return res.status(200).json({
                message: "Product added to cart successfully",
                data: cart
            })
        } catch (error) {
            return res.status(500).json({ message: "error" })
        }


    },
    getAllCart: async (req, res) => {
        const { userId } = req.params;
        Cart.findOne({ user: userId }).then(data => {
            return res.status(200).json({
                message: "Get all product in cart",
                data: data.product
            })
        }).catch(error => {
            return res.status(500).json({message: error})
        })

    }


}

module.exports = cartController