import Todos from "../components/Todos";
import { Button } from "@mui/material";

export default function Home({ user }) {

  function handleSignOut() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="content">
      {/* <img className="profile-pic" src={user.picture} alt="img"></img> */}
      {/* <h3>{user.name}</h3> */}
      <Button variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Todos />
    </div>
  );
}
