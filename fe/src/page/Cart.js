import {useEffect, useState} from 'react'
import { GetInCart } from '../services/product.service'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Cart = () => {
    const userStore = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [cart,setCart] = useState();
    useEffect(() => {
        if (userStore) {
            GetInCart({userId: userStore.id}).then(data => {
                setCart(data.data.data)
            }).catch(error => toast(error))
            
        }
        else{
            
            navigate('/home')
        }
    },[navigate,userStore])
    
    return ( 
        <div className='container'>
            <div className="row">

            <h1>Product In cart</h1>
            {cart?.product?.map(product => (
                <div className='col-4'>
                    <h3>name: {product.name}</h3>
                    <h3>price: {product.price}</h3>
                    <h3>discountPercent: {product.discountPercent}%</h3>
                    <h3>quantity: {product.quantity}</h3>

                </div>
            ))}

            <h1 className='mt-5'>Cart info</h1>
            <p>discountTotal:  {cart?.discountTotal}</p>
            <p>totalProduct:  {cart?.totalProduct}</p>
            <p>totalQuantity:  {cart?.totalQuantity}</p>
            <p>totalPrice:  {cart?.totalPrice}</p>
            </div>
        </div>
    )
}

export default Cart