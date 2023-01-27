import axios from "axios";
import { ObjectID } from "bson";
import { SERVER_URL } from "../variables/global";

const addTodo = (
  token,
  content,
  setTodoList,
  todoList,
  setMessage,
  setOpenMsg
) => {
  const id = new ObjectID();
  const todoListItem = {
    ...content,
    id: id,
  };

  setTodoList([...todoList, todoListItem]);

  const config = {
    method: "post",
    url: SERVER_URL + "/add-todo",
    data: {
      content: todoListItem,
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

export default addTodo;
