import { useEffect, useState } from "react";

function Ai_Get_Post() {
  const apiUrl = "http://127.0.0.1:8000/todo";
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () =>
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    const _id = todos.length + 1;
    const _item = document.getElementById("floatingInput").value;
    const newTodo = { id: _id, item: _item };
    debugger;

    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newTodo),
    }).then(fetchTodos);
    debugger;
  };

  return (
    <>
      <form onSubmit={(e) => addTodo(e)} className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Task"
        />
        <label htmlFor="floatingInput">Task</label>
      </form>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Ai_Get_Post;
