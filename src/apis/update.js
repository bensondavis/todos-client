import axios from "axios";
import { SERVER_URL } from "../variables/global";

const updateTodo = (token, id, value, setMessage, setOpenMsg) => {
  const config = {
    method: "post",
    url: SERVER_URL + "/update-todo-item",
    data: {
      id: id,
      todoItem: value,
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

const updateAllCompleted = (token, value, setMessage, setOpenMsg) => {
  const config = {
    method: "post",
    url: SERVER_URL + "/update-all-todo",
    data: {
      completed: value,
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

const updateCompleted = (token, id, value, setMessage, setOpenMsg) => {
  const config = {
    method: "post",
    url: SERVER_URL + "/update-todo-completed",
    data: {
      id: id,
      completed: value,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config).catch((err) => {
    setMessage(err?.response?.data
      ? err.response.data
      : "Unable to connect to server");
    setOpenMsg(true);
  });
};

export { updateTodo, updateAllCompleted, updateCompleted };
