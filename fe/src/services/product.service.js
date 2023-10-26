import axios from "axios"
import { URL_SERVER } from "../config/database"


export const AddProductService = async ({name,description,price,discountPercent,stock,brand,thumbnail,uploadedImages}) => {
    return await axios.post(`${URL_SERVER}/product`,{name,description,price,discountPercent,stock,brand,thumbnail,image:uploadedImages});
}

export const GetAllProduct = async () => {
    return await axios.get(`${URL_SERVER}/product`);
}

export const GetProductByID = async (id) => {
    return await axios.get(`${URL_SERVER}/product/${id}`);
}

export const CreateComment = async ({title,body,id}) => {
    
    const userStore = JSON.parse(localStorage.getItem("user"));

    return await axios.post(`${URL_SERVER}/product/${id}/comments`,{title,body,user:userStore.id})
}

export const GetInCart = async ({userId}) => {
    console.log(userId);

    return await axios.get(`${URL_SERVER}/cart/${userId}`);
}

export const pushToCart = async ({userId,productId,quantity}) => {

    return await axios.post(`${URL_SERVER}/cart`,{
        user: userId,
        product: {
            _id:productId,
            quantity:Number(quantity)
        }
    });
}

export const GetComment = async ({productId}) => {

    return await axios.get(`${URL_SERVER}/comment/${productId}`);
}