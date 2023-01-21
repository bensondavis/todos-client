import { Navigate  } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const withAuth = (Component) => {
  const AuthRoute = () => {
    useEffect(() => {
      const theUser = localStorage.getItem("user");
  
      if (theUser && !theUser.includes("undefined")) {
        const tempUser = JSON.parse(theUser);
  
        var config = {
          method: "post",
          url: "http://localhost:8000/login",
          headers: {
            Authorization: "Bearer " + tempUser.token,
          },
        };
  
        axios(config)
          .catch((err) => {
            console.log("err: "+err);
            localStorage.removeItem('user');
          });
      }
    }, []);

    const isAuth = !!localStorage.getItem("user");
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthRoute;
};

export default withAuth;