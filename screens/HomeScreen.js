import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoList";
import * as AppAuth from "expo-app-auth";

import { useInputValue, useTodos } from "../hooks/todolist";

const HomeScreen = memo(props => {
  const { inputValue, changeInput, clearInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();
  const config = {
    issuer: "https://accounts.google.com",
    clientId:
      "713570698875-82bp550ojqpi1fvf5dmrnelp05dhn8n8.apps.googleusercontent.com",
    scopes: ["profile"]
  };
  const clearInputAndAddTodo = _ => {
    clearInput();
    addTodo(inputValue);
  };

  const tokenResponse = async () => {
    const appState = await AppAuth.authAsync(config);
    console.log(appState);
    return appState;
  };

  return (
    <Layout>
      <Text onPress={() => tokenResponse()}>hoge</Text>
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
