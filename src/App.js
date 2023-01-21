import "./App.css";
import Typography from "@mui/material/Typography";
import "@fontsource/pacifico";
import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  return (
    <div className="App">
      <Typography className="title" fontFamily={"pacifico"}>
        todos
      </Typography>

      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/signup"
            element={user?.email ? <Navigate to="/home" /> : <SignupPage />}
          />
          <Route
            exact
            path="/login"
            element={user?.email ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            exact
            path="/home"
            element={
              user?.email ? <Home user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
