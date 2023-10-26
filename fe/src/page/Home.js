import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Home = () => {
    const userStore = JSON.parse(localStorage.getItem("user"));
   
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("user");
        toast("logout successfully");
        navigate('/register');
        
    }

    return (
        <div className="container">
            <h1>Home</h1>
            <h1>Username: {userStore?.username}</h1>
            <h1>Email: {userStore?.email}</h1>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
export default Home