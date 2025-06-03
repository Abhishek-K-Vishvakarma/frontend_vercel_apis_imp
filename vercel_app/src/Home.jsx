import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h3>Welcome! to Home Page! in frontend development!</h3>
      <Link to="/user">Users</Link>
    </div>
  )
}

export default Home
