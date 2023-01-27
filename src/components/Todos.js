import TodosItem from "./TodosItem";
import { deleteTodo } from "../apis/deleteTodo";
import { updateTodo, updateCompleted } from "../apis/update";
import FilterButton from "./FilterButton";
import { Stack } from "@mui/system";
import { useState } from "react";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Todos = ({
  todoList,
  user,
  setTodoList,
  setUser,
  setMessage,
  setOpenMsg,
}) => {
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    const editedTodoList = todoList.filter((todos) => id !== todos.id);
    setTodoList(editedTodoList);
    deleteTodo(user.token, id, setMessage, setOpenMsg);
  };

  const editTodo = (id, newTodo) => {
    const editedTodoList = todoList.map((todos) => {
      if (id === todos.id) {
        return { ...todos, todoItem: newTodo };
      }

      return todos;
    });
    setTodoList(editedTodoList);
    updateTodo(user.token, id, newTodo, setMessage, setOpenMsg);
  };

  const editCompleted = (id, newCompleted) => {
    const editedTodoList = todoList.map((todos) => {
      if (id === todos.id) {
        return { ...todos, completed: newCompleted };
      }

      return todos;
    });
    setTodoList(editedTodoList);
    updateCompleted(user.token, id, newCompleted, setMessage, setOpenMsg);
  };

  return (
    <>
      <div className="inner">
        {todoList
          ? todoList
              .filter(FILTER_MAP[filter])
              .map((data) => (
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
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"center"}
        sx={{ mt: 1 }}
      >
        {FILTER_NAMES.map((name) => (
          <FilterButton
            name={name}
            key={name}
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </Stack>
    </>
  );
};

export default Todos;
