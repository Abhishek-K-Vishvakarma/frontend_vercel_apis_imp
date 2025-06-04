import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./Authentication";
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const Registeration = () =>{
  const nmRef = useRef();
  const emRef = useRef();
  const passRef = useRef();
  const mobRef = useRef();
  const addressRef = useRef();
  const isVerifiedRef = useRef();
  const [gen, setGen] = useState("");
  const [spin, setSpin] = useState(false);
  const {user} = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const obj = {
      name: nmRef.current.value,
      email: emRef.current.value,
      password: passRef.current.value,
      phone: mobRef.current.value,
      address: addressRef.current.value,
      isVerified: isVerifiedRef.current.value,
      gender: gen,
    };

    if (!nmRef.current.value || !emRef.current.value || !passRef.current.value || !mobRef.current.value || !addressRef.current.value || !isVerifiedRef.current.value || !gen) {
      toast.error("Please fill all fields");
      return;
    }

    if(obj.isVerified === "true"){
       toast("Registration data is verified");
    }else{
       toast.error("Registration data is not verified");
    }

    console.log("Gender selected:", obj.gender);
    console.log("Registration isVerified:", obj.isVerified);

    try {
      const response = await fetch("http://localhost:5000/api/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();   

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(()=>{
          navigate("/verify");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed! Please try again.");
    }
  };
   console.log(gen);
   const require = isVerifiedRef.current?.value === "true"
   const isVerifiedData = nmRef.current?.value && emRef.current?.value && passRef.current?.value && mobRef.current?.value && addressRef.current?.value && require && gen;
   useEffect(()=>{
    setSpin(true);
    setTimeout(()=>{
      setSpin(false);
    }, 2000);
     if (require){
      toast.error("Please fill all fields before submitting the form.");
      return;
     }
   }, [require]);

  return (
    <div>
      <Navbar style={{ backgroundColor: '#209', padding: '10px' }}>
        <Container>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>Home Page</Link>
          <button onMouseOver={handleShow}>PROFILE</button>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} style={{ marginLeft: '80rem', width: '400px', height: '25rem', boxShadow: '0 0 10px #ccc' }}>
        <p style={{ background: '#cc0c39', color: 'white', textAlign: 'center', fontWeight: 'bold', padding: '5px' }}>USER PROFILE</p><br /><br />
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Name: {user?.data?.user?.name}</p>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Email: {user?.data?.user?.email}</p>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Phone: {user?.data?.user?.phone}</p>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Address: {user?.data?.user?.address}</p>
        <br /><br />
        <Link to="/user_register" style={{ textDecoration: 'none', color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>REGISTRATION</Link>
        {(user?.data?.user?.name === undefined) ? <Link to="/userlogin" style={{ textDecoration: 'none', color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>LOGIN</Link> : <Link to="/userlogout" style={{ textDecoration: 'none', color: 'red', fontSize: '20px', fontWeight: 'bold' }}>LOGOUT</Link>}

      </Offcanvas>
      <form
        onSubmit={handleRegister}
        className="card"
        style={{
          width: "35rem",
          height: "auto",
          padding: "35px",
          borderRadius: "0px",
          left: "35%",
          boxShadow: "0 0 10px #ccc",
          top: "80px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          position: "absolute",
        }}
      >
        <p style={{background: '#cc0c39', color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px', padding: '12px'}}>SIGN UP PAGE ?</p>
        <br/><br/>
        <label>
          <input type="text" style={styles} placeholder="Enter Your Name" ref={nmRef} className="form-control" />
        </label>
        <br />
        <label>
          <input type="email" style={styles} placeholder="Enter Your Email" ref={emRef} className="form-control" />
        </label>
        <br />
        <label>
          <input type="password" style={styles} placeholder="Enter Your Password" ref={passRef} className="form-control" />
        </label>
        <br />
        <label>
          <input type="text" style={styles} placeholder="Enter Your Phone" ref={mobRef} className="form-control" />
        </label>
        <br />
        <label>
          <input type="text" style={styles} placeholder="Enter Your Address" ref={addressRef} className="form-control" />
        </label>
        <br />
        <label>
          <select style={styles} className="form-control" ref={isVerifiedRef}>
            <option>Choose Verify all registeration data</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <br />

        <div>
          <label style={{ fontSize: '20px', marginLeft: '-15px'}}>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gen === "Male"}
              onChange={(e) => setGen(e.target.value)}
              style={{ width: '50px' }}
            />
            Male
          </label>
          <br />
          <label style={{ fontSize: '20px', marginLeft: '-15px' }}>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gen === "Female"}
              onChange={(e) => setGen(e.target.value)}
              style={{ accentColor: 'green', width: '50px' }}
            />
            Female
          </label>
          <br />
          <label style={{ fontSize: '20px', marginLeft: '-15px' }}>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={gen === "Other"}
              onChange={(e) => setGen(e.target.value)}
              style={{accentColor: 'red', width: '50px'}}
            />
            Other
          </label>
        </div>

        <br />
        {
          isVerifiedData ? (
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '20px', borderRadius: '0px' }}>
              {spin ? "Registering..." : "Register"}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '20px', borderRadius: '0px' }} disabled>
              Please fill all fields
            </button>
          )
        }
      </form>
      <ToastContainer />
    </div>
  );
};

const styles = {
  borderRadius: "0px",
  padding: '10px',
  fontSize: '20px'
}

export default Registeration;
