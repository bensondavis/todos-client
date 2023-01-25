import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState, useRef } from "react";
import { useDoubleTap } from "use-double-tap";
import { IconButton } from "@mui/material";

export default function TodosItem({
  id,
  onDelete,
  todoItem,
  completed,
  editTodo,
  editCompleted,
}) {
  const [value, setValue] = useState(todoItem);
  const [checked, setChecked] = useState(completed);
  const [edited, setEdited] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [hover, setHover] = useState(false);
  const textareaRef = useRef(null);

  const bind = useDoubleTap((event) => {
    if (!completed) setReadOnly(false);
  });

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
    editCompleted(id, event.target.checked);
  };

  const handleSubmit = () => {
    editTodo(id, value);
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

  useEffect(()=> {
    setChecked(completed);
  }, [completed])

  const completedTextStyle = {
    textDecoration: "line-through",
    color: "#d9d9d9",
  };

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  const handleDelete = () => {
    onDelete(id);
  };

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
          checked={checked}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 28 },
            position: "absolute",
            top: 8,
            left: 12,
            zIndex: 2,
          }}
          icon={<CheckCircleOutlineOutlinedIcon />}
          checkedIcon={<CheckCircleIcon sx={{ color: "#66c6b4" }} />}
          onClick={handleCheckbox}
        />
        {/* <input
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
        /> */}
        <textarea
          ref={textareaRef}
          value={value}
          readOnly={readOnly}
          className={"new-todo"}
          style={completed ? completedTextStyle : {}}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setReadOnly(true);
              handleSubmit();
            }
          }}
          onBlur={() => setReadOnly(true)}
          {...bind}
        />
        {hover ? (
          <IconButton
            sx={{ position: "absolute", top: 12, right: 12 }}
            onClick={handleDelete}
          >
            <DeleteIcon className="deleteBtn" />
          </IconButton>
        ) : null}
      </div>
    </>
  );
}
