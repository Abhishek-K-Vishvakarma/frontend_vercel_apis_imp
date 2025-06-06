import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";
import { ToastContainer, toast } from "react-toastify";
const ShopingUser = () => {
  const [data, setData] = useState([]);
  const { AddtoCart, add } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/get_product")
      .then(e => e.json())
      .then((data) => {
        setData(data.data)
      })
  }, []);

  const Addtocart = (data)=>{
     AddtoCart(data);
    toast.success("Cart data addedd!"); 
     setTimeout(()=>{
       navigate("/cart");
     }, 2000);
  }
  console.log("Add :", add);
  const splitdata = data.map(({quantity})=>{
    return quantity;
  });
  for(let i = 0; i < splitdata.length; i++){
      console.log(splitdata[i].toString());
  }
  return (
    <div>
      <Navbar className="bg-dark">
        <Container>
          <Link to="/" style={{textAlign: 'center', color: 'lightblue', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px'}}>HOME</Link>
        </Container>
      </Navbar>
      {
        data.map((product) => {
          return <>
            <div className="card" style={{ width: '35rem', height: '28rem', display: 'inline-block', padding: '20px', margin: '15px', fontSize: '18px', borderRadius: '0px', boxShadow: '0px 0px 10px #ccc'}}>
              <p style={{display: 'flex'}}><p style={{fontWeight: 'bold'}}>Product Name</p> : {product.name}</p>
              <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Price</p> : {product.price}</p>
              <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Color </p>: {product.color}</p>
              <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Size </p> : {product.size}</p>
              <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Quantity </p>: {(product.quantity)}</p>
              <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Description </p> : {product.description}</p>
              <br/>
              <p style={{ display: 'flex', marginLeft: '100px'}}>
                <button onClick={''} style={{ background: 'orange', padding: '5px 35px', border: 'none' }}>Buy Now</button> &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={()=> Addtocart(product)} style={{ background: 'yellow', padding: '5px 35px', border: 'none' }}>Add Cart</button>
              </p>
            </div>
          </>
        })
      }
      <ToastContainer/>
    </div>
  )
}

export default ShopingUser;
