import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function GoogleAuth({ handleGoogle, setMessage, openMsg }) {
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
          setMessage("Login Failed");
          openMsg(true);
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
