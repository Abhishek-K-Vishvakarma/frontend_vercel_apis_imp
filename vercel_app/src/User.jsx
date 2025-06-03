import { useEffect, useState } from "react"
const User = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch("https://vercel-api-server-backend.vercel.app/api/allusers")
    .then(e=> e.json())
    .then((data)=>{
      console.log(data);
      setData(data.data);
    })
  }, []);
  return (
    <div>
      <h2>Welcome to user component!</h2>
      <p>Here imlementations of vercel backend server apis in frontend!</p>
      <br/>
      {
        data.map((user)=>{
          return<>
          <h2>Name : {user.name}</h2>
          <h2>Email : {user.email}</h2>
          <h2>Password : {user.password}</h2>
          </>
        })
      }
    </div>
  )
}

export default User
