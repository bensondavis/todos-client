import Chip from "@mui/material/Chip";
import { useState } from "react";

const FilterButton = ({ name, setFilter, isPressed }) => {
  return (
    <Chip
      label={name}
      onClick={() => setFilter(name)}
      variant={isPressed ? "filled" : "outlined"}
    />
  );
};

export default FilterButton;
