import {Input, Stack } from "@mui/material";
// import DoneIcon from '@mui/icons-material/Done';

export default function Todos() {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{ minWidth: "330px" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <svg height="100" width="100">
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#F2F2F2"
            stroke-width="3"
            fill="transparent"
          />
        </svg>
        <Input
          sx={{ fontSize: "35px", width: "600px" }}
          placeholder="Placeholder"
        />
      </Stack>
    </>
  );
}
