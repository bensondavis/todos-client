import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function GoogleAuth({ handleGoogle, setError, openError }) {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        shape="pill"
        theme="filled_black"
        text="continue_with"
        width="250px"
        onSuccess={(credentialResponse) => {
          handleGoogle(credentialResponse);
        }}
        onError={() => {
          setError("Login Failed");
          openError(true);
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
