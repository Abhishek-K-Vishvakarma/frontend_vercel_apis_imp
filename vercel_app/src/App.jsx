// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import User from './User';
// import Home from './Home';
// import Category from './category/Category';
// import { Navbar, Container } from 'react-bootstrap';
// import Subcategory from './subcategory/Subcategory';
// import ShippingAddress from '../shipping/ShippingAddress';
// import Admin from '../admin/Admin';
// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Route path='/admin' element={<Admin />} />
//         <Navbar style={{ backgroundColor: '#209', padding: '10px' }}>
//           <Container>
//             <Link to="/" style={{textDecoration: 'none', color: 'seagreen', fontSize: '20px', fontWeight: 'bold'}}>Home Page</Link>
//             <Link to="/category" style={{ textDecoration: 'none', color: 'seagreen', fontSize: '20px', fontWeight: 'bold' }}>Category Page</Link>
//             <Link to="/subcategory" style={{ textDecoration: 'none', color: 'seagreen', fontSize: '20px', fontWeight: 'bold' }}>Subcategory Page</Link>
//             <Link to="/shipping" style={{ textDecoration: 'none', color: 'seagreen', fontSize: '20px', fontWeight: 'bold' }}>ShippingAddress Page</Link>
//           </Container>
//         </Navbar>
//         <Routes>
//           <Route path="/user" element={<User />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/category" element={<Category />} />
//           <Route path="/subcategory" element={<Subcategory />} />
//           <Route path="/shipping" element={<ShippingAddress />} />
//           <Route path="*" element={<h1>Page Not Found</h1>}/>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App;