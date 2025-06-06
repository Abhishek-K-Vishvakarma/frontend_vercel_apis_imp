import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Category from './category/Category';
import Subcategory from './subcategory/Subcategory';
import ShippingAddress from '../shipping/ShippingAddress';
import Admin from '../admin/Admin';
import Login from '../Login';
import Products from './product/Products';
import { Authentication } from '../Authentication';
import Logout from '../Logout';
import Registeration from '../Registeration';
import GuestPage from '../GuestPage';
import EmailVerify from '../EmailVerify';
import ShopingUser from './ShopingUser';
import Addtocart from './Addtocart';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Authentication>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcategory" element={<Subcategory />} />
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="*" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/product" element={<Products />} />
          <Route path="/userlogout" element={<Logout />} />
          <Route path="/user_register" element={<Registeration />} />
          <Route path="/guest" element={<GuestPage/>}/>
          <Route path="/verify" element={<EmailVerify />} />
          <Route path="/shoping" element={<ShopingUser />} />
          <Route path="/cart" element={<Addtocart />} />
        </Routes>
      </Authentication>
    </BrowserRouter>
  </StrictMode>,
)
