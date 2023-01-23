import Todos from "../components/Todos";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import addTodo from "../apis/addTodo";
import getTodo from "../apis/getTodo";

const Home = ({ user, setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getTodo(user.email, user.token, todoList, setTodoList);
  }, []);

  const handleChange = (value) => {
    setTodo(value);
  };

  const handleSubmit = () => {
    if (todo !== "") {
      const content = {
        completed: false,
        todoItem: todo,
      };
      addTodo(user.email, content, user.token, setTodoList, todoList);
      setTodo("");
    }
  };

  // function handleSignOut() {
  //   localStorage.removeItem("user");
  //   setUser({});
  // }

  return (
    <>
      <div
        className="content"
        style={{ maxWidth: "700px", position: "relative" }}
      >
        <IconButton sx={{ position: "absolute", zIndex: 2, top: 12, left: 12 }}>
          <DoneIcon />
        </IconButton>
        <input
        style={{marginBottom: 5}}
          className="new-todo"
          placeholder="What needs to be done?"
          value={todo}
          autoFocus={true}
          onChange={(e) => handleChange(e.target.value)}
          onKeyUp={(e) => {
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
        <Todos todoList={todoList} user={user} setTodoList={setTodoList} />
      </div>
    </>
  );
};
export default Home;
