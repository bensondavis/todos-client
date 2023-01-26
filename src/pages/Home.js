import Todos from "../components/Todos";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IconButton, Checkbox, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import addTodo from "../apis/addTodo";
import getTodo from "../apis/getTodo";
import AccountMenu from "../components/Menu";
import { updateAllCompleted } from "../apis/update";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Badge from "@mui/material/Badge";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { deleteCompleted } from "../apis/deleteTodo";
import Dialog from "../components/Dialog";

const Home = ({ user, setUser, setError, setOpenError }) => {
  const [todoList, setTodoList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [todo, setTodo] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleClickOpenDialog = () => {
    setOpenDialog(!openDialog);
  }

  const handleClearCompleted = () => {
    const editedTodoList = todoList.filter((todos)=> todos.completed === false)
    setTodoList(editedTodoList);
    deleteCompleted(user, setError, setTodoList, setUser, setOpenError);
  }

  useEffect(() => {
    getTodo(user, setTodoList, setUser, setOpenError, setError);
  }, [user, setError, setUser, setOpenError]);

  useEffect(() => {
    let count = 0;
    todoList.map((todos) => {
      if (todos.completed === true) {
        count++;
      }
      return count;
    });
    setCompletedCount(count);
  }, [todoList]);

  return (
    <>
      <div
        className="content"
        style={{ maxWidth: "700px", position: "relative" }}
      >
        <AccountMenu user={user} onLogout={handleSignOut} />
        <Checkbox
          checked={completedCount === todoList.length && todoList.length !== 0}
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
        <Badge
          badgeContent={
            todoList.length !== 0 ? todoList.length - completedCount : 0
          }
          sx={{ position: "absolute", bottom: 4, left: 20 }}
          color="success"
        >
          <AssignmentIcon sx={{ color: "#4d4d4d" }} />
        </Badge>
        <Tooltip title="Clear completed">
        <IconButton
          sx={{ position: "absolute", bottom: -6, right: 20 }}
          size="medium"
          onClick={handleClickOpenDialog}
        >
          <Badge badgeContent={completedCount} color="success">
            <ClearAllIcon sx={{ color: "#4d4d4d" }} fontSize="medium" />
          </Badge>
        </IconButton>
        </Tooltip>
        <Dialog open={openDialog} onClose={handleClickOpenDialog} handleClick={handleClearCompleted} />
      </div>
    </>
  );
};
export default Home;
