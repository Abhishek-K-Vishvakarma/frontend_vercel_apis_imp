import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentAuth } from "./Account";
import { useEffect, useState } from "react";
import { RiShieldUserFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import {clearAuth} from "./Account";
const Admin = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const user = getCurrentAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  const [id, setId] = useState("");
  console.log("user id is :", id)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState(""); 
  const logout = ()=>{
    clearAuth();
    toast.success("Logout successfully!");
    setTimeout(()=>{
      navigate("/userlogin");
    }, 2000);
  }
  console.log(user);


  useEffect(() => {
    fetch("http://localhost:5000/api/allUsers")
      .then(e => e.json())
      .then((data) => {
        setUsers(data.data);
        console.log("All users data:", data.data);
      })
  }, []);

  const SetData = (id)=>{
  const findUser = users.find(u=> u._id === id);
  console.log("Selected user data:", findUser);
  if(findUser){
    setName(findUser.name);
    setEmail(findUser.email)
    setPhone(findUser.phone)
    setGender(findUser.gender);
    setAddress(findUser.address);
    setId(findUser._id || "Not found id");
  }
  }

  const UpdateUser = async (e) =>{
    e.preventDefault();
    if(!name && !email && !phone && !address && !gender) {
      toast.error("Please fill all fields");
      return;
    }
    const obj = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      gender: gender
    }
    try {
      const response = await fetch(`http://localhost:5000/api/put_user/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Error updating user");
      } else {
        toast.success("User updated successfully!");
        setTimeout(()=>{
        window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Error updating user:", error);
    }
  }

  const UserDelete = async(id) =>{
    try {
      const response = await fetch(`http://localhost:5000/api/user_del/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Error deleting user");
      } else {
        toast.success("User deleted successfully!");
        setUsers(users.filter(user => user._id !== id));
        console.log("User deleted:", data);
      }
    } catch (error) {
      toast.error("Error deleting user:", error);
    }
  }

  return (
    <div style={{ background: 'url(https://t3.ftcdn.net/jpg/02/31/54/48/360_F_231544825_ElnBQbd6IgbIvP8p9xmZ3YkZhfvfWwna.jpg)', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <Navbar className="bg-info" style={{ zIndex: '2' }}>
        <Container>
          <Link to="/admin" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDZfUD_hY9cY4bEW-IcneWSt08n3VLCjrFBbMTTxfxC00IUuq2ICIk7e5HsRakqsj9Dsk&usqp=CAU" style={{ borderRadius: '10%', width: '5rem' }} />
          </Link>
          <Link to="/category" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>CREATE CATEGORY</Link>
          <button onMouseOver={handleShow} style={{ background: 'none', border: "none", fontSize: '20px', color: 'white', fontWeight: 'bold' }}>ADMIN PROFILE</button>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} style={{ marginLeft: '80rem', width: '400px', height: '25rem', boxShadow: '0 0 10px #ccc', padding: '20px' }}>
        <h4 style={{ background: 'green', color: 'white', textAlign: 'center', padding: '5px' }}>Welcome to Admin profile</h4>
        <p style={{ fontSize: '50px', textAlign: 'center', color: 'green' }}><RiShieldUserFill />
          <hr />
        </p>
        <p style={{ color: "blue", fontSize: '20px' }}>Role : {user?.role}</p>
        <p style={{ color: "blue", fontSize: '20px' }}>Email : {user?.email}</p>
        <br/><br/>
        <button onClick={logout}>Logout</button>
      </Offcanvas>
      <h2 className="text-center text-white">Welcome! to Admin Page</h2>
      <br /><br />
      {
        users.map((user, ind) =>{
          return <>
            <div key={user._id} className="card" style={{ display: 'inline-block', padding: '20px', margin: '35px', width: '35rem' }}>
              <h4 >USER INDEX : {ind + 1}</h4>
              <hr />
              <p style={{ fontSize: '20px', fontWeight: 'bold', }}>Name: {user.name}</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', }}>Email: {user.email}</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', }}>Phone: {user.phone}</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', }}>Address: {user.address}</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', }}>Gender: {user.gender}</p>
              <br />
              <button onClick={() => UserDelete(user._id)} className="btn btn-danger" style={{ width: '100%', padding: '10px', borderRadius: '0px', fontWeight: 'bold' }}>Delete User</button>
              <br/><br/>
              <button onMouseOver={() => SetData(user._id)} style={{background: 'seagreen', color: 'white'}}>Update</button>{' '}
              <button onMouseOver={handleShow1} style={{background: 'yellow', color: 'red'}}>Edit</button>
            </div>
          </>
        })
      }
      <Offcanvas show={show1} onHide={handleClose1} style={{ width: "30rem", height: '30rem', marginLeft: '40rem',padding: "20px", background: "none", borderRadius: "0px", border: "none", marginTop: '-2rem' }}>
        <form onSubmit={UpdateUser} className="card" style={{ width: "35rem", height: '45rem', margin: "auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "0px", boxShadow: "0 0 10px #ccc", marginTop: '10rem' }}>
          <p style={{background: '#cc0c39', color: "#fff", fontWeight: 'bold', padding: '12px', textAlign: 'center'}}>EDIT YOUR PRFILE OR CREDINTAILS</p>
          <br/>
          <label>
            <input type="text" placeholder="SET NAME" className="form-control" style={{padding: '12px', borderRadius: '0px', fontSize: '20px'}} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br /><br />
          <label>
            <input type="text" placeholder="SET Email" className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br /><br />
          <label>
            <input type="text" placeholder="SET Phone" className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <br /><br />
          <label>
            <input type="text" placeholder="SET Address" className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <br /><br />
          <label>
            <input type="text" placeholder="SET Gender" className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} value={gender} onChange={(e) => setGender(e.target.value)} />
          </label>
          <br /><br />
          <button type="submit" className="form-control" style={{background: 'navy', fontSize: '18px', color: 'white', padding: '12px', borderRadius: '0px'}}>Save Changes</button>
        </form>
      </Offcanvas>
      <ToastContainer />
    </div>
  )
}

export default Admin;
