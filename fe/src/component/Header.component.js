import { Link, Outlet, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const Header = () => {
    const userStore = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("user");
        toast("logout successfully");
        navigate('/register');
        
    }
    
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/home">Navbar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to='/product'>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/addproduct">Add new Product</Link>
                            </li>
                            {userStore && (<div class="nav-item d-flex"><h3>{userStore.username}</h3><button onClick={handleLogout}>logout</button></div>)}
                            {!userStore && (<Link class="nav-item btn btn-primary" to='/register'>Register</Link>)}
                        </ul>
                        
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}
export default Header