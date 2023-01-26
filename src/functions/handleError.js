const handleError = (setUser, setError, setOpenError, message, setTodoList) => {
  setError(message);
  setOpenError(true);
  setUser({});
  setTodoList([]);
  localStorage.removeItem("user");
}

export default handleError;