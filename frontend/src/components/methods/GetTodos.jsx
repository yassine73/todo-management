import { createContext, useEffect, useState } from "react";
import PostTodo from "./PostTodo";
import InputTypes from "./inputTypes";

export const todoContext = createContext({ todos: [], fetchTodos: () => {} });

function GetTodos() {
  const ApiURl = "http://127.0.0.1:8000/todo";
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () =>
    await fetch(ApiURl)
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <todoContext.Provider value={{ todos, fetchTodos }}>
      <PostTodo />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Todo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th scope="row">{todo.id}</th>
              <td>{todo.item}</td>
              <td align="right">
                <InputTypes
                  index={todo.id}
                  class_name="btn btn-outline-primary"
                  val="Edit"
                />
                <InputTypes
                  index={todo.id}
                  class_name="btn btn-outline-danger"
                  val="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.item}
            <button
              style={{ textAlign: "right" }}
              type="button"
              className="btn btn-primary"
            >
              Primary
            </button>
          </li>
        ))}
      </ul> */}
    </todoContext.Provider>
  );
}

export default GetTodos;
