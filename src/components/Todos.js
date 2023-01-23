import TodosItem from "./TodosItem";
import deleteTodo from "../apis/deleteTodo";
import updateTodo from "../apis/updateTodo";

const Todos = ({ todoList, user, setTodoList }) => {

  const handleUpdate = (id, data) => {
    updateTodo(user.email, id, user.token, data);
  }

  const handleDelete = (id, index) => {
      deleteTodo(user.email, id, user.token);

      const arr = [...todoList];
      arr.splice(index, 1);
      setTodoList(arr);
  }

  return (
    <div className="inner">
      {todoList
        ? todoList.map((data, index) => (
            <TodosItem
              data={data}
              key={data._id}
              index={index}
              onChange={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        : null}
    </div>
  );
};

export default Todos;
