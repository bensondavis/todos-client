import "./App.css";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "@fontsource/pacifico";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleClose = () => {
    setOpenError(false);
  }

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
          setError("Session expired!");
          setOpenError(true);
        });
    }
  }, []);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
                <SignupPage setUser={setUser} setError={setError} setOpenError={setOpenError} />
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
                <LoginPage setUser={setUser} setError={setError} setOpenError={setOpenError} />
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
      <Snackbar
        autoHideDuration={6000}
        open={openError}
        onClose={handleClose}
        message={error}
        action={action}
      />
      <footer>
        {user?.email ? <Typography variant="body2">Double-Click to edit</Typography> : null}
        <Typography variant="body2">
          Made with ❤️ by{" "}
          <a className="footer-link" target={"_blank"} href="https://github.com/bensondavis">
            Benson
          </a>
        </Typography>
      </footer>
    </div>
  );
}

export default App;
