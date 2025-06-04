import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Subcategory = () => {
  const nmRef = useRef();
  const defRef = useRef();
  const category_IdRef = useRef();
   const [data, setData] = useState([]);
   const [category_Id, setCategory_Id] = useState("");
   const navigate = useNavigate();
  useEffect(()=>{
    fetch("http://localhost:5000/api/get_category")
    .then(e=> e.json())
    .then((data)=>{
     console.log(data);
     setData(data.data);
    })
  }, []);

 const handleSubcategorySubmit = async(e)=>{
  e.preventDefault();
  const obj = {
    name: nmRef.current.value,
    description: defRef.current.value,
    category_id: category_IdRef.current.value
  }
  try{
    const response = await fetch(`http://localhost:5000/api/subcategory/:${category_Id}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || "Failed to create subcategory");
      }else{
        toast.success("Subcategory Created Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          data: data.message
        });
        navigate("/product");
      }
      console.log(data)
  }catch(error){
   toast.error("Error creating subcategory!", error);
 }
}

console.log("Category id is : ", category_Id);

  return (
    <div>
      <Navbar className="bg-info" style={{ zIndex: '2' }}>
        <Container>
          <Link to="/admin" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>ADMIN</Link>
        </Container>
      </Navbar>
      <form onSubmit={handleSubcategorySubmit} className="card" style={{ width: '35rem', height: '35rem', padding: '35px', borderRadius: '0px', margin: 'auto', marginTop: '50px', boxShadow: '0 0 10px #ccc' }}>
        <p style={{background: "#cc0c39", color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '12px'}}>CREATE SUBCATEGORY</p>
        <br/><br/>
        <label>
          <input type="text" placeholder="Enter Name" ref={nmRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} />
        </label>
        <br/><br/>
        <label>
          <input type="text" placeholder="Enter Description" ref={defRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} />
        </label>
        <br/><br/>
        <label>
          {/* <input type="text" placeholder="Enter Category" ref={category_IdRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} /> */}
          <select ref={category_IdRef} className="form-control" onChange={(e) => setCategory_Id(e.target.value)} style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }}>
            <option>Choose category_id</option>
            {
              data.map((data)=>{
                return<option key={data._id} value={data._id}>{data.name}</option>
              })
            }
          </select>
        </label>
        <br/><br/>
        <button type='submit' style={{color: 'orange', background: 'navy', fontWeight: 'bold', padding: '12px'}}>SUBCATEGORY</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Subcategory;
