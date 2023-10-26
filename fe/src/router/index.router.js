import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import RegisterPage from "../page/Register";
import AddProduct from "../page/AddProduct";
import ListProduct from "../page/ListProduct";
import ProductDetail from "../page/ProductDetail";
import Cart from "../page/Cart";
import Header from "../component/Header.component";
const appRouter = createBrowserRouter([
    {
        path: '',
        element: <Header />,
        children: [
            {
                path: '/home',
                element: <Home />
            },

            {
                path: '/register',
                element: <RegisterPage />
            },

            {
                path: '/addproduct',
                element: <AddProduct />
            },
            {
                path: '/product',
                element: <ListProduct />
            },
            {
                path: '/product/:id',
                element: <ProductDetail />
            },
            {
                path: '/cart',
                element: <Cart />

            }
        ]
    }

])
export default appRouter