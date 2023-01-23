import axios from "axios";

const updateTodo = (email, id, token, updateData) => {
  const config = {
    method: "post",
    url: "http://localhost:8000/update-todo",
    data: {
      email: email,
      id: id,
      update: updateData,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config);
}

export default updateTodo;