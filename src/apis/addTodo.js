import axios from "axios";

const addTodo = (email, content, token, setTodoList, todoList=[]) => {

  setTodoList([
    ...todoList,
    {
      ...content,
    },
  ]);
  
  const config = {
    method: "post",
    url: "http://localhost:8000/add-todo",
    data: {
      email: email,
      content: content,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios(config);
  // .then((res) => {
  //   setTodoList([...todoList, {
  //     ...content,
  //   }]);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

export default addTodo;
