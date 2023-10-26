import { useEffect, useState } from "react"
import { register } from "../services/user.service";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const userStore = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    useEffect(() => {
        if (userStore) {
            navigate('/home')
        }
    },[userStore,navigate])
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleCreateUser = (e) => {
        e.preventDefault();
        register(username, email, password).then(res => {
            if (res.data.data) {
                toast("Create User successfully");
                localStorage.setItem("user",JSON.stringify({id:res.data.data._id,username:res.data.data.username,email:res.data.data.email}))
                navigate("/home")
            }
            else {
                toast(res.data.message, )
            }
        });

    }


    return (
        <div className="" style={{ height: "100vh" }}>

            <div className="container h-100">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <form className="w-50" onSubmit={handleCreateUser}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">UserName</label>
                            <input type="text" className="form-control" id="username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" >Create User</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage