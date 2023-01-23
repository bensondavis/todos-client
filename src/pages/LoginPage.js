import Login from "../components/Login";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

const LoginPage = ({ setUser }) => {
  return (
    <Stack
      sx={{ minHeight: "calc(80vh - 192px)" }}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Login setUser={setUser} />
      <p>
        <Link to={"/signup"}>Don't have an account? SignUp</Link>
      </p>
    </Stack>
  );
};

export default LoginPage;
