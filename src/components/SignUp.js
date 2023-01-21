import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const { handleGoogle, loading, error, success } = useFetch(
    "http://localhost:8000/signup"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </div>
      {success ? <Navigate to="/home" />: null}
    </>
  );
};

export default SignUp;