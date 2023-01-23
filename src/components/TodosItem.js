import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useDoubleTap } from "use-double-tap";
import updateTodo from "../apis/updateTodo";
import { IconButton } from "@mui/material";

export default function TodosItem({ data, token, user }) {
  const [value, setValue] = useState(data.todoItem);
  const [complete, setComplete] = useState(data.completed);
  const [edited, setEdited] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [hover, setHover] = useState(false);

  const bind = useDoubleTap((event) => {
    if (!complete) setReadOnly(false);
  });

  const handleCheckbox = (event) => {
    setComplete(!complete);
    setEdited(true);
  };

  const handleSubmit = () => {
    updateTodo(user.email, data._id, token, {
      todoItem: value,
      completed: complete,
    });
  };

  const handleChange = (value) => {
    setValue(value);
    setEdited(true);
  };

  useEffect(() => {
    if (readOnly && edited) {
      handleSubmit();
      setEdited(false);
    }
  }, [readOnly]);

  useEffect(() => {
    if (edited) {
      handleSubmit();
      setEdited(false);
    }
  }, [complete]);

  const completedTextStyle = {
    textDecoration: "line-through",
    color: "#d9d9d9",
  };

  

  const handleDelete = ()=> {}

  return (
    <>
      <div
        className="content"
        style={{
          maxWidth: "700px",
          position: "relative",
          userSelect: "none",
          marginTop: 3,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Checkbox
          defaultChecked={complete}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 28 },
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
          }}
          icon={<CheckCircleOutlineOutlinedIcon />}
          checkedIcon={<CheckCircleIcon sx={{ color: "#66c6b4" }} />}
          onClick={handleCheckbox}
        />
        <input
          className="new-todo"
          defaultValue={value}
          readOnly={readOnly}
          onChange={(e) => handleChange(e.target.value)}
          style={complete ? completedTextStyle : {}}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onBlur={() => setReadOnly(true)}
          {...bind}
        />
        {hover ? (
          <IconButton sx={{position: "absolute", top: 12, right: 12}}>
            <DeleteIcon className="deleteBtn" />
          </IconButton>
        ) : null}
      </div>
    </>
  );
}
