import TodosItem from "./TodosItem";
import deleteTodo from "../apis/deleteTodo";
import {updateTodo, updateCompleted} from "../apis/update";

const Todos = ({ todoList, user, setTodoList }) => {

  const handleDelete = (id) => {
    const editedTodoList = todoList.filter((todos) => id !== todos._id);
    setTodoList(editedTodoList);
    deleteTodo(user.email, id, user.token);
  }

  const editTodo = (id, newTodo) => {
    const editedTodoList = todoList.map((todos)=>{
      if(id === todos._id) {
        return {...todos, todoItem: newTodo}
      }

      return todos;
    })
    setTodoList(editedTodoList);
    updateTodo(user.email, id, user.token, newTodo);
  }

  const editCompleted = (id, newCompleted) => {
    const editedTodoList = todoList.map((todos)=>{
      if(id === todos._id) {
        return {...todos, completed: newCompleted}
      }

      return todos;
    })
    setTodoList(editedTodoList);
    updateCompleted(user.email, id, user.token, newCompleted);
  }

  return (
    <div className="inner">
      {todoList
        ? todoList.map((data, index) => (
            <TodosItem
              todoItem={data.todoItem}
              completed={data.completed}
              key={data._id}
              id={data._id}
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
