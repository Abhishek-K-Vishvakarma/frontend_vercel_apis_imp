import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "./Authentication";
import { Alert } from "react-bootstrap";
import { adminAccounts } from "./admin/Account";
const Login = () => {
  const { login } = useAuth();
  // const { user } = useAuth();
  const emRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msg1, setMsg1] = useState("Please Login to access the Home Page!");
  const handleLogin = async(e)=>{
    e.preventDefault();
    const obj = {
      email: emRef.current.value,
      password: passRef.current.value
    }
    const userInfo = adminAccounts(obj.email, obj.password);
    if (userInfo) {
      toast.success(`Logged in as ${ userInfo.role }`);
      navigate(userInfo.role === "admin" ? "/admin" : "/guest");
      return;
    }
    try{
      const response = await fetch("http://localhost:5000/api/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      } else {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(data);
        login({ data });
        setMsg(data.message);
        setTimeout(() => {
          navigate("/");
          setMsg("");
        }, 3000);
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.", error);
    }
  }

  useEffect(()=>{
   const timeout = setTimeout(()=>{
   setMsg1("");
   }, 5000);
   return ()=> clearTimeout(timeout);
  }, []);

  return (
    <div style={{ background: 'url(https://t3.ftcdn.net/jpg/09/61/27/48/360_F_961274808_fX06eKzHJDCX9LO1Uew8YsL8Gk7RDZBu.jpg)', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative' }}>
      {msg1 ? 
        <p style={{ position: 'absolute', top: '26rem', left: '35%', width: '35%', color: 'blue', fontWeight: 'bold', fontSize: '30px', display: 'flex'}}>{msg1}</p>
        :
        <form onSubmit={handleLogin} className="card" style={{ width: '35rem', height: '35rem', padding: '35px', borderRadius: '0px', left: '35%', boxShadow: '0 0 10px #ccc', top: '100px', backgroundColor: 'rgba(255, 255, 255, 0.8)', position: 'absolute' }}>
          <br /><br />
          <p style={{ background: "#cc0c39", color: '#fff', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>HERE! LOGIN PAGE</p>
          <br /><br />
          <label>
            <input type="text" placeholder="Enter Email" ref={emRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} />
          </label>
          <br /><br />
          <label>
            <input type="text" placeholder="Enter Password" ref={passRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} />
          </label>
          <br /><br />
          <button type="submit" className="form-control" style={{ background: 'navy', color: 'orange', fontWeight: 'bold', padding: '12px', borderRadius: '0px', fontSize: '18px' }}>Login</button>
          <p>
            Don't have an account? <Link to="/user_register" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>Register here</Link>
          </p>
        </form>
      }
      {msg ? <Alert variant="success" style={{ position: 'absolute', top: '20px', left: '35%', width: '35%' }}>{msg}</Alert> : ""}
      <ToastContainer />
      {/* <p style={{ position: 'absolute', top: '20px', left: '35%', width: '35%', color: 'blue', fontWeight: 'bold' }}>Already have an account? <a href="/user_register" style={{ textDecoration: 'none', color: 'blue' }}>Register here</a></p> */}
    </div>
  )
}

export default Login
// { (user?.data?.user?.name === undefined) ? <p style={{ position: 'absolute', top: '20px', left: '35%', width: '35%', color: 'red', fontWeight: 'bold' }}>Please Login to access the Home Page!</p> : "" }
