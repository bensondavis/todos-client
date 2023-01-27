import { Link } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import GoogleAuth from "../components/GoogleAuth";
import useFetch from "../hooks/useFetch";
import { SERVER_URL } from "../variables/global";

export default function SignupPage({ setUser, setMessage, setOpenMsg }) {
  const { handleGoogle, loading } = useFetch(
    SERVER_URL + "/signup",
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
        <h1>Register to continue</h1>
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
        <Link to={"/login"}>Already have an account? Login</Link>
      </p>
    </Stack>
  );
}
