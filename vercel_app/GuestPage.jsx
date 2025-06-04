import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const GuestPage = () => {
  return (
    <div style={{ background: "url(https://msgwords.com/wp-content/uploads/2025/01/Welcome-Quotes-for-Guests.jpg)", backgroundSize: "cover", height: "102vh", padding: "20px", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      {/* <Carousel>
        <Carousel.Item interval={1000}>
          <img src="https://www.shutterstock.com/image-photo/woman-technology-digital-interface-word-600nw-2479652707.jpg"/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
        <img/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
        <img/>
        </Carousel.Item>
      </Carousel> */}
      <Navbar style={{background: '#7678'}}>
        <Container>
          <Link to="/userlogin" style={{textDecoration: 'none', color: 'yellow', fontSize: '20px'}}>Login Now!</Link>
        </Container>
      </Navbar>
    </div>
  )
}

export default GuestPage;
