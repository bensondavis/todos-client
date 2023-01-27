import "./App.css";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { CircularProgress, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "@fontsource/pacifico";
import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "./variables/global";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Home = lazy(() => import("./pages/Home"));

const Loading = (
  <Stack
    sx={{
      color: "#ead9d9",
      width: "100vw",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 3,
      backdropFilter: "blur(10px)",
    }}
    alignItems={"center"}
    justifyContent={"center"}
  >
    <CircularProgress color="inherit" />
  </Stack>
);

function App() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [openMsg, setOpenMsg] = useState(false);

  const handleClose = () => {
    setOpenMsg(false);
  };

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

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      const tempUser = JSON.parse(theUser);

      var config = {
        method: "post",
        url: SERVER_URL + "/login",
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
          setMessage(
            err?.response?.data
              ? err.response.data
              : "Unable to connect to server"
          );
          setOpenMsg(true);
        });
    }
  }, []);

  useEffect(() => {
    if (openMsg === true) {
      const timer = setTimeout(() => {
        setOpenMsg(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, openMsg]);

  useEffect(() => {
    if (message === "Session Expired" && openMsg) {
      setUser({});
      localStorage.removeItem("user");
    }
  }, [message, openMsg]);

  return (
    <div className="App">
      <Typography
        className="title"
        fontFamily={"pacifico"}
        sx={{ userSelect: "none" }}
      >
        todos
      </Typography>
      <Suspense fallback={Loading}>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/signup"
              element={
                user?.email ? (
                  <Navigate to="/home" />
                ) : (
                  <SignupPage
                    setUser={setUser}
                    setMessage={setMessage}
                    setOpenMsg={setOpenMsg}
                  />
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
                  <LoginPage
                    setUser={setUser}
                    setMessage={setMessage}
                    setOpenMsg={setOpenMsg}
                  />
                )
              }
            />
            <Route
              exact
              path="/home"
              element={
                user?.email ? (
                  <Home
                    user={user}
                    setUser={setUser}
                    setMessage={setMessage}
                    setOpenMsg={setOpenMsg}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <Snackbar
        open={openMsg}
        onClose={handleClose}
        message={
          message?.response?.data
            ? message.response.data
            : message?.message
            ? message.message
            : message
        }
        action={action}
      />
      <footer>
        {user?.email ? (
          <Typography variant="body2">Double-Click to edit</Typography>
        ) : null}
      </footer>
    </div>
  );
}

export default App;
