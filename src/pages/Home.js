import Todos from "../components/Todos";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IconButton, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import addTodo from "../apis/addTodo";
import getTodo from "../apis/getTodo";
import AccountMenu from "../components/Menu";
import { updateAllCompleted } from "../apis/update";

const Home = ({ user, setUser, setError, setOpenError }) => {
  const [todoList, setTodoList] = useState([]);
  const [completedCount, setCompletedCount] = useState(-1);
  const [todo, setTodo] = useState("");

  const handleChange = (value) => {
    setTodo(value);
  };

  const handleSubmit = () => {
    if (todo !== "") {
      const content = {
        completed: false,
        todoItem: todo,
      };
      addTodo(
        user,
        setUser,
        content,
        setTodoList,
        todoList,
        setError,
        setOpenError
      );
      setTodo("");
    }
  };

  function handleSignOut() {
    localStorage.removeItem("user");
    setUser({});
  }

  function handleCompleteAll(e) {
    const editedTodoList = todoList.map((todos) => {
      todos.completed = e.target.checked;

      return todos;
    });
    setTodoList(editedTodoList);
    updateAllCompleted(
      user,
      e.target.checked,
      setUser,
      setError,
      setOpenError,
      setTodoList
    );
  }

  useEffect(() => {
    getTodo(user, setTodoList, setUser, setOpenError, setError);
  }, [user, setError, setUser, setOpenError]);

  useEffect(() => {
    if (todoList.length !== 0) {
      let count = 0;
      todoList.map((todos) => {
        if (todos.completed === true) {
          count++;
        }
      });
      setCompletedCount(count);
    } else {
      setCompletedCount(-1);
    }
  }, [todoList]);

  return (
    <>
      <div
        className="content"
        style={{ maxWidth: "700px", position: "relative" }}
      >
        <AccountMenu user={user} onLogout={handleSignOut} />
        <Checkbox
          checked={todoList.length ? completedCount === todoList.length : false}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 28 },
            position: "absolute",
            top: 8,
            left: 12,
            zIndex: 2,
          }}
          icon={<DoneIcon />}
          checkedIcon={<DoneAllIcon sx={{ color: "#66c6b4" }} />}
          onClick={handleCompleteAll}
        />
        <input
          style={{ marginBottom: 5 }}
          className="new-todo"
          placeholder="What needs to be done?"
          value={todo}
          autoFocus={true}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <IconButton
          sx={{ position: "absolute", zIndex: 2, top: 12, right: 12 }}
          onClick={handleSubmit}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className="outer">
        <Todos
          todoList={todoList}
          user={user}
          setTodoList={setTodoList}
          setUser={setUser}
          setError={setError}
          setOpenError={setOpenError}
        />
      </div>
      <p>defe</p>
    </>
  );
};
export default Home;
