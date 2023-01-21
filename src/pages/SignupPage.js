import SignUp from "../components/SignUp";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return(
    
    <>
      <SignUp />
      <p>
        <Link to={"/login"}>Already have an account? Login</Link>
      </p>
    </>)
}