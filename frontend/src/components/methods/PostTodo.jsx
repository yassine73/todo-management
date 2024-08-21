import { useContext, useState } from "react";
import { todoContext } from "./GetTodos";

function PostTodo() {
  const { todos, fetchTodos } = useContext(todoContext);
  const postApiURl = "http://127.0.0.1:8000/todo";
  const [inputText, setInputText] = useState("");

  const addTodo = async (e) => {
    let _id = -1;

    for (let i = 0; i < todos.length; i++) {
      _id = todos[i].id;
    }

    const new_todo = {
      id: _id + 1,
      item: inputText,
    };

    fetch(postApiURl, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_todo),
    }).then(fetchTodos);
  };

  return (
    <form onSubmit={(e) => addTodo(e)} className="form-floating mb-3">
      <input
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        type="text"
        className="form-control"
        id="floatingInput"
        placeholder="Task"
      />
      <label htmlFor="floatingInput">Task</label>
    </form>
  );
}

export default PostTodo;
