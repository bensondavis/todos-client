import Login from "../components/Login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <Login />
      <p>
        <Link to={"/signup"}>Don't have an account? SignUp</Link>
      </p>
    </>
  );
}

export default LoginPage;
