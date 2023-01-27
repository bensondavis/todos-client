import axios from "axios";
import { ObjectID } from "bson";
import handleError from "../functions/handleError";

const addTodo = (
  user,
  setUser,
  content,
  setTodoList,
  todoList,
  setError,
  setOpenError
) => {
  const id = new ObjectID();
  const todoListItem = {
    ...content,
    id: id,
  };

  setTodoList([...todoList, todoListItem]);

  const config = {
    method: "post",
    url: "https://todos-server-mnch.onrender.com/add-todo",
    data: {
      email: user.email,
      content: todoListItem,
    },
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };

  axios(config).catch((err) => {
    console.log({err});
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

export default addTodo;
