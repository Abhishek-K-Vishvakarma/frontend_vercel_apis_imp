import { Link } from "react-router-dom";
import { useAuth } from "../Authentication";
import { Container, Navbar } from "react-bootstrap";
import { IoMdHome } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Addtocart = () => {
  const { add, deleteCartData } = useAuth();
  console.log(":",add);
  return (
    <div>
      <Navbar style={{ backgroundColor: '#209', padding: '10px' }}>
        <Container>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }}><IoMdHome /> Home Page</Link>
          <Link to="/shoping" style={{ textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Buy Now</Link>
        </Container>
      </Navbar>
      <br/><br/>
      {
        add.length > 0
        ?
          add.map((product) => {
            return <>
              <div className="card" style={{ width: '32rem', height: '30rem', display: 'inline-block', padding: '20px', margin: '15px', fontSize: '18px', borderRadius: '0px', boxShadow: '0px 0px 10px #ccc' }}>
                <br />
                <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Product Name</p> : {product.name}</p>
                <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Price</p> : {product.price}</p>
                <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Color </p>: {product.color}</p>
                <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Size </p> : {product.size}</p>
                <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Quantity </p>: {product.quantity}</p>
                <p style={{ display: 'flex' }}><p style={{ fontWeight: 'bold' }}>Description </p> : {product.description}</p>
                <hr/>
                <p>
                  If You want to delete then click at : 
                  <button onClick={() => deleteCartData(product._id)} style={{ background: 'none', border: 'none', fontSize: '25px' }}><MdDelete /></button>
                </p>
              </div>
            </>
          })
          :
          <p className="text-center mt-5">Add to Cart data not found!</p>
      }
    </div>
  )
}

export default Addtocart;
