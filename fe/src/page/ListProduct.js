import { useEffect, useState } from 'react'
import { GetAllProduct, pushToCart } from '../services/product.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ListProduct = () => {
    const [ListProduct, setListProduct] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        GetAllProduct().then(data => setListProduct(data.data.data)).catch(error => toast(error))
    }, [])
    const handleNavigate = (id) => {
        navigate(`/product/${id}`)
    }
    const handleAddToCart = (e,productId) => {
        e.preventDefault();
        const userStore = JSON.parse(localStorage.getItem("user"));
        const quantity = e.target.quantity.value;
        console.log(quantity);
        pushToCart({userId:userStore.id,productId,quantity}).then(data => {
            toast(data.data.message);
        }).catch(error => toast(error))
    }
    return (
        <div className="container">
            <div className="row">

                {ListProduct.map(product => (
                    <div className="col-3">
                        <div class="card" style={{ width: "18rem" }}>
                            <img src={product.thumbnail} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{product.name}</h5>
                                <p class="card-text">{product.description}</p>
                                <p>Giá: {product.price}</p>
                                <p>Discount: {product.discountPercent}% </p>
                                <p>Còn lại trong kho : {product.stock}</p>
                                <p>Brand: {product.brand}</p>
                                <div className='d-flex justify-content-between'>
                                    <div class="btn btn-primary" onClick={() => handleNavigate(product._id)}>Details</div>
                                    <form onSubmit={(e) => handleAddToCart(e,product._id)}>
                                        <input type="number" name="quantity" id="" min="0" max={product.stock} />
                                        <input type="submit" className='btn btn-primary' value="Add To Cart" />
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>

    )
}

export default ListProduct