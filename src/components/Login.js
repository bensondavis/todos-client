import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Stack } from "@mui/material";

function Login({ setUser }) {
  const { handleGoogle, loading, error, success } = useFetch(
    "http://localhost:8000/login"
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
        <h1>Login to continue</h1>
      </header>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {loading ? (
          <div>Loading....</div>
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

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Stack>
    </GoogleOAuthProvider>
    // </>
  );
}

export default Login;
