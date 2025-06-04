import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
const Authcontext = createContext();
export const Authentication = ({children}) => {
  const [user, setUser] = useState();
  useEffect(() => {
  let saveUser = localStorage.getItem("user");
  if(saveUser){
     setUser(JSON.parse(saveUser));
     console.log("User is already logged in and from Authentication", JSON.parse(saveUser));
  }
  }, []);
  const login = (data)=>{
   localStorage.setItem("user", JSON.stringify(data));
   setUser(data);
  }
  const logout = ()=>{
    localStorage.removeItem("user");
    setUser(null);
  }
  return (
    <div>
      <Authcontext.Provider value={{user, login, logout}}>
        {children}
      </Authcontext.Provider>
    </div>
  )
}

export const useAuth = ()=> useContext(Authcontext);

