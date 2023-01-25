import { useState } from "react";
import axios from "axios";

const useFetch = (url, setUser) => {
  const [loading, setLoading] = useState(false);
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
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message
            ? err.response.data.message
            : err.message
        );
      });
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
