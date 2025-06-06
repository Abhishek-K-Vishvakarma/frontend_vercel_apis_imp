import { useEffect, useRef, useState } from "react"
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
const Products = () => {
  const nmRef = useRef();
  const defRef = useRef();
  const priceRef = useRef();
  const subcategory_IdRef = useRef();
  const colorRef = useRef();
  const quantityRef = useRef();
  const sizeRef = useRef();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  useEffect(()=>{
    fetch("http://localhost:5000/api/get_subcategory")
    .then(e=> e.json())
    .then((data)=>{
      console.log(data.data);
      setData(data.data);
    })
  }, []);

  const handelSubmit = async (e) => {
     e.preventDefault();
    const obj = {
      name: nmRef.current.value,
      description: defRef.current.value,
      price: Number(priceRef.current.value),
      subcategory_id: subcategory_IdRef.current.value,
      color: colorRef.current.value,
      quantity: Number(quantityRef.current.value),
      size: sizeRef.current.value
     }
    try{
      const response = await fetch(`http://localhost:5000/api/product/${id}`,{ 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });
  
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message || "Failed to create product");
        } else {
          toast.success("Product Created Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Optionally, you can redirect or reset the form here
     }
    }catch(error){
       toast.error("Error creating product!", error);
    }
  }
   console.log("Subcategory id is : ", id);
  return (
    <div>
      <Navbar className="bg-info">
        <Container>
          <Link to="/admin" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>ADMIN</Link>
        </Container>
      </Navbar>
      <form onSubmit={handelSubmit} className="card" style={{ width: '35rem', height: '45rem', padding: '35px', borderRadius: '0px', margin: 'auto', marginTop: '50px', boxShadow: '0 0 10px #ccc' }}>
        <p style={{background: "#cc0c39", color: '#fff', fontWeight: 'bold', padding: '12px', textAlign: 'center'}}>ADDING PRODUCT BRAND</p>
        <br/>
        <label>
          <input type="text" placeholder="Enter Product Name" ref={nmRef} className="form-control" style={{fontSize: '20px', borderRadius: '0px', padding: '10px'}}/> 
        </label>
        <br/>
        <label>
          <input type="text" placeholder="Enter Description" ref={defRef} className="form-control" style={{ fontSize: '20px', borderRadius: '0px', padding: '10px' }} />
        </label>
        <br />
        <label>
          <input type="number" placeholder="Enter Price" ref={priceRef} className="form-control" style={{ fontSize: '20px', borderRadius: '0px', padding: '10px' }} />
        </label>
        <br />
        <label>
          <input type="text" placeholder="Enter Color" ref={colorRef} className="form-control" style={{ fontSize: '20px', borderRadius: '0px', padding: '10px' }} />
        </label>
        <br />
        <label>
          <input type="number" placeholder="Enter Quantity" ref={quantityRef} className="form-control" style={{ fontSize: '20px', borderRadius: '0px', padding: '10px' }} />
        </label>
        <br />
        <label>
          <input type="text" placeholder="Enter Size" ref={sizeRef} className="form-control" style={{ fontSize: '20px', borderRadius: '0px', padding: '10px' }} />
        </label>
        <br />
        <select style={{ fontSize: '20px', borderRadius: '0px', padding: '10px' }} ref={subcategory_IdRef} onChange={(e)=> setId(e.target.value)} className="form-control" >
          <option>Choose Subcategory_ID</option>
          {
            data.map((data)=>{
              return<>
              <option key={data._id} value={data._id}>{data.name}</option>
              </>
            })
          }

        </select>
        <br />
        <button type="submit" className="form-control" style={{ fontSize: '20px', borderRadius: '0px', padding: '10px', backgroundColor: 'navy', color: 'orange', fontWeight: 'bold'}}>PRODUCT</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Products
