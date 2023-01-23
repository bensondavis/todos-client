import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Stack, CircularProgress, Typography } from "@mui/material";

function Login({ setUser }) {
  const { handleGoogle, loading, error, success, setSuccess} = useFetch(
    "http://localhost:8000/login"
  );

  useEffect(() => {
    if (success) {
      const temp = JSON.parse(localStorage.getItem("user"));
      setUser(temp);
      setSuccess(false);
    }
  }, [success]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <header style={{ textAlign: "center" }}>
        <h1>Login to continue</h1>
      </header>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {loading ? (
          <CircularProgress color="#ead9d9" />
        ) : (
          <GoogleLogin
            shape="pill"
            theme="filled_black"
            text="continue_with"
            width="250px"
            onSuccess={(credentialResponse) => {
              handleGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}

        {error && <Typography variant="body2" style={{ color: "red" }}>{error}</Typography>}
      </Stack>
    </GoogleOAuthProvider>
    // </>
  );
}

export default Login;
