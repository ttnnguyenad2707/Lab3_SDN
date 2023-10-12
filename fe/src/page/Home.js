import { useEffect, useState } from "react"
import axios from "axios";
import { URL_SERVER } from "../config/database";
import { Link } from "react-router-dom";

const Home = () => {
    const [search, setSearch] = useState('');
    const [searchResult,setSearchResult] = useState([])
    console.log(search);
    const [data, setData] = useState([]);
    
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        axios.get(`${URL_SERVER}/brand`).then(data => setBrand(data.data))
        axios.get(`${URL_SERVER}/product`).then(data => setData(data.data))
    }, [])

    const handleSearch = async () => {

        try {
            
            let Result = []
            data.forEach(data => {
                if(data.title.toLowerCase().includes(search.toLowerCase())){
                    searchResult.push(data);
                }
            })

            setSearchResult(Result);
        } catch (error) {
          console.error(error);
        }
      };


    const handleFilter = (id) => {
        axios.post(`${URL_SERVER}/product/filterByBrand`,{id:id}).then(data => setData(data.data))
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="category">
                        <h2>Filter</h2>
                        {brand.map((category,index) => {
                            return (
                                <div className="form-check" key={index} onClick={()=> handleFilter(category.id)}>
                                    <input className="form-check-input" type="radio" name="category" id={category.id} />
                                        <label className="form-check-label" for={category.id}>
                                            {category.name}
                                        </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-8">
                    <h1 className="text-center">List of product </h1>
                    <input type="text" placeholder="Enter title to search" onChange={(e) => setSearch(e.target.value)}></input>
                    <button className="btn btn-primary" onClick={handleSearch}>search</button>
                    <Link to='/add' className="btn btn-primary ms-5">Add Product</Link>

                    <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>


                    </tr>
                </thead>
                <tbody>
                    {data.map((data,index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{data.id}</th>

                                <td> {data.title} </td>
                                <td> {data.description} </td>
                                <td> {data.price} </td>
                                <td> {data.discountPercentage} </td>
                                <td> {data.brand} </td>
                                <td> {data.category} </td>




                            </tr>

                        )
                    })}
                    
                </tbody>
            </table>
        </div>
                </div>
            </div>
        </div>
    )
}
export default Home