import { useCallback, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import {  toast } from 'react-toastify';
import { AddProductService } from "../services/product.service";

import '../styles/AddProduct.scss'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [images, setImages] = useState([]);
    // const [imagesStore,setImageStore] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        setImages(prev => [...prev, ...acceptedFiles]);
    }, [])
    const handleRemoveFile = (event, fileName) => {

        event.stopPropagation();
        setImages((prev) => prev.filter((image) => image.name !== fileName));
    };
    const handleRemoveEvent = (e) => {
        e.stopPropagation();
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true })
    
    const uploadedImages = [];
    const uploadToCloudinary = async () => {
        try {
            for (const image of images) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('folder', "Lab3");
                formData.append('upload_preset', 'Lab3_SDN');
                formData.append('public_id', uuidv4());
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dtpujfoo8/upload`,
                    formData
                );

                    
                uploadedImages.push({url: response.data.url,caption:"image caption",path:"image path"});
                // setImageStore(prev => [...prev,{url: response.data.url,caption:"image caption",path:"image path"}])
                // console.log(response.data.url);
            }
            // setImageStore(prev => [...prev,...uploadedImages])
        } catch (error) {
            console.error('Upload error:', error);
        }
    };
    const uploadImages = async () => {
        if (images.length > 0) {
            try {
                await uploadToCloudinary();
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };

    const handleAddProduct =async (e) => {
        e.preventDefault();
        await uploadImages();
        await AddProductService({name,description,price,discountPercent,stock,brand,thumbnail,uploadedImages}).then(res => {
            toast(res.data.message)
        }).catch(error => toast(error))
    }

    return (
        <div className="container">
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description" name="description" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" className="form-control" id="price" name="price" onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="discountPercent">Discount Percent:</label>
                    <input type="number" className="form-control" id="discountPercent" name="discountPercent" onChange={e => setDiscountPercent(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" className="form-control" id="stock" name="stock" onChange={e => setStock(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input type="text" className="form-control" id="brand" name="brand" onChange={e => setBrand(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail:</label>
                    <input type="text" className="form-control" id="thumbnail" name="thumbnail" onChange={e => setThumbnail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                        <input {...getInputProps()} />

                        {isDragActive ? (
                            <p>Thả các tệp tin vào đây...</p>
                        ) : (
                            <p>Kéo và thả các tệp tin vào đây, hoặc nhấp để chọn tệp tin</p>
                        )}

                        <div className="preview">
                            {images.map((file) => (
                                <div key={file.name} className="file-preview">
                                    
                                    <img src={URL.createObjectURL(file)} alt={file.name} />
                                    
                                    <div className="" onClick={(event) => handleRemoveFile(event, file.name)}>x</div>
                                    <input type="text" name="caption" onClick={handleRemoveEvent} />

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" >Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct