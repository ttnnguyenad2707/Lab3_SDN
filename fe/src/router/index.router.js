import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import AddProduct from "../component/AddProduct.component";
const appRouter = createBrowserRouter([
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/add',
        element: <AddProduct />
    },
])
export default appRouter