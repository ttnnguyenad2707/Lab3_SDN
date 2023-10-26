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

                    await cartNew.product.push({ ...productFind._doc, quantity: product.quantity });

                    cartNew.totalProduct += 1;
                    cartNew.totalQuantity += product.quantity;
                    cartNew.totalPrice += productFind._doc.price * (1 - productFind._doc.discountPercent / 100) * product.quantity;
                    cartNew.discountTotal += productFind._doc.price * (productFind._doc.discountPercent / 100) * product.quantity;
                    await cartNew.save();
                    return res.status(200).json({
                        message: "Product added to cart successfully",
                        data: cartNew
                    })

                }).catch(error => {
                    return res.status(500).json({ message: "error push to cart" })

                })
            }
            else {


                const productFind = await Products.findById(product._id);
                const existingProduct = cart.product.find(item => item._id.toString() === productFind._id.toString());
                if (existingProduct) {
                    // Sản phẩm đã tồn tại trong giỏ hàng, chỉ cộng thêm số lượng
                    existingProduct.quantity += product.quantity;
                    cart.totalQuantity += product.quantity;
                }
                else {
                    // Sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
                    cart.product.push({ ...productFind._doc, quantity: product.quantity });
                    cart.totalProduct += 1;
                    cart.totalQuantity += product.quantity;
                }
                cart.totalPrice += productFind._doc.price * (1 - productFind._doc.discountPercent / 100) * product.quantity;
                cart.discountTotal += productFind._doc.price * (productFind._doc.discountPercent / 100) * product.quantity;
                await cart.save();
                return res.status(200).json({
                    message: "Product added to cart successfully",
                    data: cart
                })
            }
        } catch (error) {
            return res.status(500).json({ message: "error" })
        }


    },
    getAllCart: async (req, res) => {
        const { userId } = req.params;
        Cart.findOne({ user: userId }).then(data => {
            return res.status(200).json({
                message: "Get all product in cart",
                data: data
            })
        }).catch(error => {
            return res.status(500).json({ message: error })
        })

    }


}

module.exports = cartController