import { Link } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import useFetch from "../hooks/useFetch";
import GoogleAuth from "../components/GoogleAuth";
import { SERVER_URL } from "../variables/global";

const LoginPage = ({ setUser, setMessage, setOpenMsg }) => {
  const { handleGoogle, loading } = useFetch(
    SERVER_URL + "/login",
    setUser,
    setMessage,
    setOpenMsg
  );

  return (
    <Stack
      sx={{ minHeight: "calc(80vh - 192px)" }}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <header style={{ textAlign: "center" }}>
        <h1>Login to continue</h1>
      </header>
      {loading ? (
        <Stack sx={{ color: "#ead9d9" }}>
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        <GoogleAuth
          handleGoogle={handleGoogle}
          setMessage={setMessage}
          openMsg={setOpenMsg}
        />
      )}

      <p>
        <Link to={"/signup"}>Don't have an account? SignUp</Link>
      </p>
    </Stack>
  );
};

export default LoginPage;
