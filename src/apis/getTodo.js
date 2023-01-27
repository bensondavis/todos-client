import axios from "axios";
import { SERVER_URL } from "../variables/global";

const getTodo = (token, setTodoList, setOpenMsg, setMessage) => {
  const config = {
    method: "post",
    url: SERVER_URL + "/get-todo-list",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      setTodoList(res.data.todoList);
    })
    .catch((err) => {
      setMessage(
        err?.response?.data ? err.response.data : "Unable to connect to server"
      );
      setOpenMsg(true);
    });
};

export default getTodo;
