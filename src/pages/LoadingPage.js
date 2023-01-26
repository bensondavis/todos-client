import { Box, CircularProgress, Stack } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack
      sx={{
        color: "#ead9d9",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 3,
        backdropFilter: "blur(10px)"
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
};

export default LoadingPage;
