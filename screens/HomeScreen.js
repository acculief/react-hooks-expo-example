import React, { memo } from "react";
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoList";

import { useInputValue, useTodos } from "../hooks/todolist";

const HomeScreen = memo(props => {
  const { inputValue, changeInput, clearInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();

  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <Layout>
      <AddTodoForm
        inputValue={inputValue}
        changeInput={changeInput}
        onIconPress={clearInputAndAddTodo}
      />
      <TodoList
        items={todos}
        onItemCheck={idx => checkTodo(idx)}
        onItemRemove={idx => removeTodo(idx)}
      />
    </Layout>
  );
});

export default HomeScreen;
