import { useEffect, useState, createContext, useContext } from "react";
const Authcontext = createContext();

export const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [add, setAdd] = useState([]);

  useEffect(() => {
    // Restore user from localStorage
    const saveUser = localStorage.getItem("user");
    if (saveUser) {
      setUser(JSON.parse(saveUser));
      console.log("User restored:", JSON.parse(saveUser));
    }

    // Restore cart from localStorage
    const saveAdd = localStorage.getItem("addtocart");
    if (saveAdd) {
      setAdd(JSON.parse(saveAdd));
      console.log("Cart restored:", JSON.parse(saveAdd));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const AddtoCart = (item) => {
    let existing = JSON.parse(localStorage.getItem("addtocart")) || [];
    if (!Array.isArray(existing)) existing = []; // ⛑️ safeguard
    const updatedCart = [...existing, item];
    localStorage.setItem("addtocart", JSON.stringify(updatedCart));
    setAdd(updatedCart);
  };
  
  const deleteCartData = (id)=>{
   if(window.confirm("Are! you sure for deleting Add to cart item's")){
     const delItems = add.filter(u=> u._id !== id);
     const confirmDelete = localStorage.setItem("addtocart", JSON.stringify(delItems));
     setAdd(confirmDelete);
   }
   setTimeout(()=>{
     window.location.reload();
   }, 1000);
   alert
  }

  return (
    <Authcontext.Provider value={{ user, login, logout, AddtoCart, add, deleteCartData }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);
