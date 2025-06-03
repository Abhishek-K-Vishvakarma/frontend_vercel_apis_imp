import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import User from './User';
import Home from './Home';
function App() {
  return (
    <>
     <h2 className="text-center text-info bg-success">Welcome to my Vercel Frontend APIs implementations</h2>
         <BrowserRouter>
           <Routes>
             <Route path="/user" element={<User/>}/>
             <Route path="/" element={<Home/>} />
           </Routes>
         </BrowserRouter>
    </>
  )
}

export default App;