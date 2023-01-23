import axios from "axios";

const deleteTodo = (email, id, token) => {
  const config = {
    method: "post",
    url: "http://localhost:8000/delete-todo",
    data: {
      email: email,
      id: id,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  }

  axios(config);
}

export default deleteTodo;