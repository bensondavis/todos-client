import axios from "axios";
import { SERVER_URL } from "../variables/global";

const deleteCompleted = (token, setMessage, setOpenMsg) => {
  const config = {
    method: "post",
    url: SERVER_URL + "/delete-completed",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config).catch((err) => {
    setMessage(
      err?.response?.data ? err.response.data : "Unable to connect to server"
    );
    setOpenMsg(true);
  });
};

const deleteTodo = (token, id, setMessage, setOpenMsg) => {
  const config = {
    method: "post",
    url: SERVER_URL + "/delete-todo",
    data: {
      id: id,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config).catch((err) => {
    setMessage(
      err?.response?.data ? err.response.data : "Unable to connect to server"
    );
    setOpenMsg(true);
  });
};

export { deleteTodo, deleteCompleted };
