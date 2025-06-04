import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Offcanvas, Dropdown } from 'react-bootstrap';
import { useAuth } from "../Authentication";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUserShield } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
const Home = () => {
  const {user} = useAuth();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const navigate = useNavigate();
  const emRef = useRef("");
  const [em, setEm] = useState("");

  useEffect(()=>{
    if(user?.data?.user?.name === undefined){
       navigate("/guest");
    }else{
       navigate("/");
    }
  }, [user, navigate]);

  const handleAuthUser = (e)=>{
    e.preventDefault();
    const obj = {
      email: emRef.current.value  
    }
    if(obj.email === user?.data?.user?.email){
      toast.success("Email is verified successfully!");
    }else{
      toast.error("Email verification failed. Please try again.");
      return;
    }
    setEm(obj.email);
    console.log("User email from Home component :", obj.email);
  }
  return (
    <div>
      <div>
        <Navbar style={{ backgroundColor: '#209', padding: '10px' }}>
          <Container>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }}><IoMdHome /> Home Page</Link>
            <button onMouseOver={handleShow} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px' }}><FaUserShield /> PROFILE</button>
          </Container>
        </Navbar>
        <Offcanvas show={show} onHide={handleClose} style={{ marginLeft: '80rem', width: '450px', height: '30rem', boxShadow: '0 0 10px #ccc', padding: '20px' }}>
          <p style={{ background: '#cc0c39', color: 'white', textAlign: 'center', fontWeight: 'bold', padding: '5px' }}>USER PROFILE</p><br /><br />
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Name: {user?.data?.user?.name}</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Email: {user?.data?.user?.email}</p>
          {(user?.data?.user?.email === em)
            ?
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                User Additional Info
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ padding: '10px', width: '100%', borderRadius: '0px', boxShadow: '0 0 10px #ccc' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Phone: India(91+) {user?.data?.user?.phone}</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Address: {user?.data?.user?.address}</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Gender: {user?.data?.user?.gender}</p>
              </Dropdown.Menu>
            </Dropdown>
            :
            <button onMouseOver={handleShow1} style={{ background: 'red', color: 'yellow', border: "none" }}>Do you want to know your Addintional Credintail's</button>
          }
          <br /><br />
          <Link to="/user_register" style={{ textDecoration: 'none', color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>REGISTRATION</Link><br />
          {(user?.data?.user?.name === undefined) ? <Link to="/userlogin" style={{ textDecoration: 'none', color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>LOGIN</Link> : <Link to="/userlogout" style={{ textDecoration: 'none', color: 'red', fontSize: '20px', fontWeight: 'bold' }}>LOGOUT</Link>}
        </Offcanvas>
        <Offcanvas show={show1} onHide={handleClose1} className="card" style={{ width: '35rem', height: '20rem', padding: '35px', borderRadius: '0px', left: '35%', boxShadow: '0 0 10px #ccc', top: '100px', backgroundColor: 'rgba(255, 255, 255, 0.8)', position: 'absolute' }}>
          <form onSubmit={handleAuthUser}>
            <p style={{ background: '#cc0c39', textAlign: 'center', color: 'white', padding: '12px', fontSize: '15px', fontWeight: 'bold' }}>Please! verify our email for access Additional Credintails</p>
            <br />
            <input type="text" className="form-control" placeholder="Enter Email For Verified" style={{ padding: '10px', fontSize: '20px', borderRadius: '0px' }} ref={emRef} /><br /><br />
            <button type="submit" className="form-control" style={{ padding: '10px', fontSize: '20px', background: 'navy', color: 'orange', fontWeight: 'bold' }} >Verified</button>
          </form>
        </Offcanvas>
        <h3>Welcome! to Home Page! in frontend development!</h3>
        <ToastContainer />
      </div>
      
    </div>
  )
}

export default Home;
