import axios from "axios";

const getTodo = (email, token, todoList, setTodoList) => {
  const config = {
    method: "post",
    url: "http://localhost:8000/get-todo-list",
    data: {
      email: email,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      setTodoList(res.data.todoList);
    })
    .catch((err) => {
      console.log({ err });
    });
};

export default getTodo;
