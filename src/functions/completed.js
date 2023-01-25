const updateTodoCompleted = (todoList, completed, setTodoList) => {
  const arr = todoList;
  arr.map((item) => {
    item["completed"] = completed;
  })

  setTodoList(arr);
}

export {updateTodoCompleted}