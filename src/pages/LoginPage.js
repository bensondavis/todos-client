import { Link } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import GoogleAuth from "../components/GoogleAuth";
import TryAgain from "../components/TryAgain";

const LoginPage = ({ setUser, setError, setOpenError }) => {
  const { handleGoogle, loading, error } = useFetch(
    "https://todos-server-mnch.onrender.com/login",
    setUser
  );

  useEffect(() => {
    if (error !== "") {
      setError(error);
      setOpenError(true);
    }
  }, [error]);

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
          setError={setError}
          openError={setOpenError}
        />
      )}
      {error ? <TryAgain /> : null}
      <p>
        <Link to={"/signup"}>Don't have an account? SignUp</Link>
      </p>
    </Stack>
  );
};

export default LoginPage;
