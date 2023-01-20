import "./App.css";
import Typography from "@mui/material/Typography";
import "@fontsource/pacifico";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginAndSignupPage from "./pages/LoginAndSignupPage";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <div className="App">
      <Typography className="title" fontFamily={"pacifico"}>
        todos
      </Typography>

      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={user?.email ? <Navigate to="/home" /> : <LoginAndSignupPage />}
          />
          <Route
            exact
            path="/home"
            element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
