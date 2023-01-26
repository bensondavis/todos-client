import axios from "axios";
import handleError from "../functions/handleError";

const deleteTodo = (user, id, setError, setTodoList, setUser, setOpenError) => {
  const config = {
    method: "post",
    url: "http://localhost:8000/delete-todo",
    data: {
      email: user.email,
      id: id,
    },
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  axios(config).catch((err) => {
    if (err.response.status === 401)
      handleError(
        setUser,
        setError,
        setOpenError,
        "Session Expired",
        setTodoList
      );
  });
};

export default deleteTodo;
