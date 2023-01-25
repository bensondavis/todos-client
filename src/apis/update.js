import axios from "axios";

const updateTodo = (email, id, token, value) => {
  const config = {
    method: "post",
    url: "http://localhost:8000/update-todo-item",
    data: {
      email: email,
      id: id,
      todoItem: value,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config);
};

const updateAllCompleted = (email, token, value) => {
  console.log(value);
  const config = {
    method: "post",
    url: "http://localhost:8000/update-all-todo",
    data: {
      email: email,
      completed: value,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config);
};

const updateCompleted = (email, id, token, value) => {
  const config = {
    method: "post",
    url: "http://localhost:8000/update-todo-completed",
    data: {
      email: email,
      id: id,
      completed: value,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config);
};

export { updateTodo, updateAllCompleted, updateCompleted };
