import "./App.css";
import Typography from "@mui/material/Typography";
import "@fontsource/pacifico";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      const tempUser = JSON.parse(theUser);

      var config = {
        method: "post",
        url: "http://localhost:8000/login",
        headers: {
          Authorization: "Bearer " + tempUser.token,
        },
      };

      axios(config)
        .then((res) => {
          if (res.status === 200) {
            setUser(tempUser);
          }
        })
        .catch((err) => {
          localStorage.removeItem("user");
        });
    }
  }, []);

  return (
    <div className="App">
      <Typography
        className="title"
        fontFamily={"pacifico"}
        sx={{ userSelect: "none" }}
      >
        todos
      </Typography>

      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/signup"
            element={
              user?.email ? (
                <Navigate to="/home" />
              ) : (
                <SignupPage setUser={setUser} />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={
              user?.email ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage setUser={setUser} />
              )
            }
          />
          <Route
            exact
            path="/home"
            element={
              user?.email ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <Typography variant="body2">Double-Click to edit</Typography>
        <Typography variant="body2">
          Made with ❤️ by{" "}
          <a target={"_blank"} href="https://github.com/bensondavis">
            Benson
          </a>
        </Typography>
      </footer>
    </div>
  );
}

export default App;
