import TodosItem from "./TodosItem";

const Todos = ({ todoList, token, user }) => {
  // console.log({todoList});
  return (
    <>
      {todoList
        ? todoList.map((data, index) => (
            <TodosItem data={data} key={index} token={token} user={user} />
          ))
        : null}
    </>
  );
};

export default Todos;
