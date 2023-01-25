import { Link } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import GoogleAuth from "../components/GoogleAuth";
import TryAgain from "../components/TryAgain";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

export default function SignupPage({ setUser, setError, setOpenError }) {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:8000/signup",
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
        <h1>Register to continue</h1>
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
        <Link to={"/login"}>Already have an account? Login</Link>
      </p>
    </Stack>
  );
}
