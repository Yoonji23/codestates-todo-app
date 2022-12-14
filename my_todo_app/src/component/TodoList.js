import { useEffect, useState } from "react";
import axios from "axios";
import { CreateTodo } from "./CreateTodo";
import { Todo } from "./Todo";

export const TodoList = ({ handleCreateBtnClick, isCreateMode }) => {
  const [todos, setTodos] = useState([]);

  const renderTodos = () => {
    axios.get("http://localhost:3001/todos").then((res) => {
      setTodos(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    renderTodos();
  }, []);

  return (
  <div>
     {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} renderTodos={renderTodos} />;
        })}
     <CreateTodo
          handleCreateBtnClick={handleCreateBtnClick}
          isCreateMode={isCreateMode}
          renderTodos={renderTodos}
        />
  </div>
  );
};
