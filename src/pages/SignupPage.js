import SignUp from "../components/SignUp";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

export default function SignupPage({setUser}) {
  return (
    <Stack
      sx={{ minHeight: "calc(80vh - 192px)" }}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <SignUp setUser={setUser} />
      <p>
        <Link to={"/login"}>Already have an account? Login</Link>
      </p>
    </Stack>
  );
}
