import axios from "axios";
import handleError from "../functions/handleError";

const getTodo = (user, setTodoList, setUser, setOpenError, setError) => {
  const config = {
    method: "post",
    url: "https://todos-server-mnch.onrender.com/get-todo-list",
    data: {
      email: user.email,
    },
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  axios(config)
    .then((res) => {
      setTodoList(res.data.todoList);
    })
    .catch((err) => {
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

export default getTodo;
