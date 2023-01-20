import { useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);

    axios.post(url, {
      credential: response.credential,
    }).then((res) => {
      console.log({res});
      setLoading(false);
      
      if(res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.reload();
      }
    }).catch((err) => {
      setError("Error: "+err.response.data.message);
    })
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
