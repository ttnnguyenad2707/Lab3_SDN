import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CreateComment, GetComment, GetProductByID } from "../services/product.service";
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [productDetail, setProductDetail] = useState()
    const [comment,setComment] = useState([])

    const loadComments = useCallback(() => {
        GetComment({ productId: id })
            .then(data => setComment(data.data.data))
            .catch(error => toast(error));
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        CreateComment({ title, body, id }).then(data => {toast(data.data.message);loadComments()}).catch(error => toast(error));
        
    }

    useEffect(() => {
        GetProductByID(id).then(data => setProductDetail(data.data.data)).catch(error => toast(error))
        loadComments();
    }, [id,loadComments])

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    {productDetail?.image.map(image => (
                        <img src={image.url} alt="product" />
                    ))}
                </div>
                <div className="col-6">
                    <h5 className="card-title">{productDetail?.name}</h5>
                    <p className="card-text">{productDetail?.description}</p>
                    <p>Giá: {productDetail?.price}</p>
                    <p>Discount: {productDetail?.discountPercent} </p>
                    <p>Còn lại trong kho : {productDetail?.stock}</p>
                    <p>Brand: {productDetail?.brand}</p>
                </div>
            </div>
            
            <div className="">
                <h3>All Comment</h3>
                {comment?.map(comment => (
                    <div>
                        <h4>Username: {comment.username}</h4>
                        <p>Title: {comment.title}</p>
                        <p>Body: {comment.body}</p>
                    </div>
                ))}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="body">body</label>
                    <input type="text" name="body" id="body" onChange={e => setBody(e.target.value)} />
                    <input type="submit" value="send" />
                </form>
            </div>
        </div>

    )

}

export default ProductDetail