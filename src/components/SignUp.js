import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Stack } from "@mui/material";

const SignUp = ({setUser}) => {
  const { handleGoogle, loading, error, success } = useFetch(
    "http://localhost:8000/signup"
  );

  useEffect(() => {
    if (success) {
      const temp = JSON.parse(localStorage.getItem("user"));
      setUser(temp);
    }
  }, [success]);

  // useEffect(() => {
  //   /* global google */
  //   if (window.google) {
  //     google.accounts.id.initialize({
  //       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       callback: handleGoogle,
  //     });

  //     google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
  //       // type: "standard",
  //       theme: "filled_black",
  //       // size: "small",
  //       text: "continue_with",
  //       shape: "pill",
  //     });

  //     // google.accounts.id.prompt()
  //   }
  // }, [handleGoogle]);

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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
      </Stack>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
