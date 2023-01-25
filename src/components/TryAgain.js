import { Button } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

const TryAgain = () => {
  const handleClick = () => {
    window.location.reload();
  };
  return <Button sx={{mt: 3, color: "gray"}} onClick={handleClick} startIcon={<ReplayIcon/>}>Try Again</Button>;
};

export default TryAgain;
