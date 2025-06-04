import { useRef } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { TbFileDescription } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Category = () => {
  const nmRef = useRef();
  const defRef = useRef();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: nmRef.current.value,
      description: defRef.current.value
    }

    try {
      const response = await fetch("http://localhost:5000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Failed to create category");
      } else {
        toast.success("Category Created Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/subcategory");
      }
    } catch (error) {
      toast.error("Error creating category!", error)
    }
  }

  return (
    <div>
      <Navbar className="bg-info" style={{ zIndex: '2' }}>
        <Container>
          <Link to="/admin" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>ADMIN</Link>
        </Container>
      </Navbar>
      <form onSubmit={handelSubmit} className="card" style={{ width: '35rem', height: '35rem', padding: '35px', borderRadius: '0px', margin: 'auto', marginTop: '50px', boxShadow: '0 0 10px #ccc' }}>
        <p style={{ background: "#cc0c39", color: 'white', fontWeight: 'bold', padding: "13px", textAlign: 'center' }}>CREATE CATEGORY</p>
        <br /><br />
        <label>
          <TbCategoryPlus style={{ fontSize: '20px', color: 'blue' }} />
          <input type="text" placeholder="Enter Name" ref={nmRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} />
        </label><br /><br />
        <label>
          <TbFileDescription style={{ fontSize: '20px', color: 'blue' }} />
          <input type="text" placeholder="Enter Description" ref={defRef} className="form-control" style={{ padding: '12px', borderRadius: '0px', fontSize: '20px' }} /><br /><br />
        </label>
        <br /><br />
        <button type="submit" className="form-control text-warning" style={{ padding: '12px', borderRadius: '0px', background: 'navy', fontSize: '15px', fontWeight: 'bold' }}>CATEGORY</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Category
