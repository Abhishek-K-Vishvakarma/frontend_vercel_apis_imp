import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authentication"
const Logout = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const handleLogout = (e)=>{
    e.preventDefault();
    logout();
    setTimeout(()=>{
      navigate("/userlogin");
    }, 2000);
  }
  return (
    <div>
      <form onSubmit={handleLogout} className="card" style={{width: '35rem', height: '35rem', padding: '35px', borderRadius: '0px', left: '35%', boxShadow: '0 0 10px #ccc', top: '100px', backgroundColor: 'rgba(255, 255, 255, 0.8)', position: 'absolute'}}>
       <h4 className="text-center">Welcome to my Logged out component, after logged out redirect to Login Page!</h4>
       <br/><br/><br/><br/>
       <button type="submit" style={{background: 'navy', color: 'orange', fontWeight: 'bold', fontSize: '18px', padding: '10px', marginTop: '65px'}}>LOGGED OUT</button>
      </form>
    </div>
  )
}

export default Logout;
