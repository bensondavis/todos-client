import { useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);

    axios
      .post(url, {
        credential: response.credential,
      })
      .then((res) => {
        setLoading(false);

        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setSuccess(true);
        }
      })
      .catch((err) => {
        setError("Error: " + err.response.data.message);
      });
  };
  return { loading, error, handleGoogle, success, setSuccess};
};

export default useFetch;
