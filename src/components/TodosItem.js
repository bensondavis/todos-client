import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState, useRef } from "react";
import { useDoubleTap } from "use-double-tap";
import { IconButton } from "@mui/material";

export default function TodosItem({ data, index, onChange, onDelete}) {
  const [value, setValue] = useState(data.todoItem);
  const [complete, setComplete] = useState(data.completed);
  const [edited, setEdited] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [hover, setHover] = useState(false);
  const textareaRef = useRef(null);

  const bind = useDoubleTap((event) => {
    if (!complete) setReadOnly(false);
  });

  const handleCheckbox = (event) => {
    setComplete(!complete);
    setEdited(true);
  };

  const handleSubmit = () => {
    onChange(data._id, {
      todoItem: value,
      completed: complete,
    })
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

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  const handleDelete = () => {
    onDelete(data._id,index);
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
          defaultChecked={complete}
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
          defaultValue={value}
          readOnly={readOnly}
          className={"new-todo"}
          style={complete ? completedTextStyle : {}}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
