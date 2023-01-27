import { useState } from "react";
import axios from "axios";

const useFetch = (url, setUser, setMessage, setOpenMsg) => {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async (response) => {
    setLoading(true);

    axios
      .post(url, {
        credential: response.credential,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setMessage(res.data.message);
        setOpenMsg(true);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(
          err?.response?.data
            ? err.response.data
            : "Unable to connect to server"
        );
        setOpenMsg(true);
      });
  };
  return { loading, handleGoogle };
};

export default useFetch;
