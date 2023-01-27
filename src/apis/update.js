import axios from "axios";
import handleError from "../functions/handleError";

const updateTodo = (
  user,
  id,
  value,
  setUser,
  setError,
  setOpenError,
  setTodoList
) => {
  const config = {
    method: "post",
    url: "https://todos-server-mnch.onrender.com/update-todo-item",
    data: {
      email: user.email,
      id: id,
      todoItem: value,
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

const updateAllCompleted = (
  user,
  value,
  setUser,
  setError,
  setOpenError,
  setTodoList
) => {
  const config = {
    method: "post",
    url: "https://todos-server-mnch.onrender.com/update-all-todo",
    data: {
      email: user.email,
      completed: value,
    },
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  axios(config).catch((err) => {
    if (err.response.status  && err.response.status === 401)
      handleError(
        setUser,
        setError,
        setOpenError,
        "Session Expired",
        setTodoList
      );
  });
};

const updateCompleted = (
  user,
  id,
  value,
  setUser,
  setError,
  setOpenError,
  setTodoList
) => {
  const config = {
    method: "post",
    url: "https://todos-server-mnch.onrender.com/update-todo-completed",
    data: {
      email: user.email,
      id: id,
      completed: value,
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

export { updateTodo, updateAllCompleted, updateCompleted };
