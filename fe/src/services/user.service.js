import axios from "axios"
import { URL_SERVER } from "../config/database"


export const register = async (username,email,password) => {
    return await axios.post(`${URL_SERVER}/user`,{username,email,password});
}