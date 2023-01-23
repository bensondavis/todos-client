import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Stack, CircularProgress, Typography } from "@mui/material";

const SignUp = ({ setUser }) => {
  const { handleGoogle, loading, error, success } = useFetch(
    "http://localhost:8000/signup"
  );

  useEffect(() => {
    if (success) {
      const temp = JSON.parse(localStorage.getItem("user"));
      setUser(temp);
    }
  }, [success]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
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
        {error && (
          <Typography variant="body2" style={{ color: "red" }}>
            {error}
          </Typography>
        )}
      </Stack>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
