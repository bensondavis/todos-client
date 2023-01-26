import TodosItem from "./TodosItem";
import deleteTodo from "../apis/deleteTodo";
import { updateTodo, updateCompleted } from "../apis/update";

const Todos = ({ todoList, user, setTodoList, setUser, setError, setOpenError }) => {
  const handleDelete = (id) => {
    const editedTodoList = todoList.filter((todos) => id !== todos.id);
    setTodoList(editedTodoList);
    deleteTodo(user, id, setError, setTodoList, setUser, setOpenError);
  };

  const editTodo = (id, newTodo) => {
    const editedTodoList = todoList.map((todos) => {
      if (id === todos.id) {
        return { ...todos, todoItem: newTodo };
      }

      return todos;
    });
    setTodoList(editedTodoList);
    updateTodo(user, id, newTodo, setUser, setError, setOpenError, setTodoList);
  };

  const editCompleted = (id, newCompleted) => {
    const editedTodoList = todoList.map((todos) => {
      if (id === todos.id) {
        return { ...todos, completed: newCompleted };
      }

      return todos;
    });
    setTodoList(editedTodoList);
    updateCompleted(user, id, newCompleted, setUser, setError, setOpenError, setTodoList);
  };

  return (
    <div className="inner">
      {todoList
        ? todoList.map((data, index) => (
            <TodosItem
              todoItem={data.todoItem}
              completed={data.completed}
              key={data.id}
              id={data.id}
              editTodo={editTodo}
              editCompleted={editCompleted}
              onDelete={handleDelete}
            />
          ))
        : null}
    </div>
  );
};

export default Todos;
