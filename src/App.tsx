import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch} from "./store/hooks";
import { RootState, AppDispatch } from "./store/store";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme} from "@mui/material";
import { Button } from "@mui/material";

import TodoList from "./components/TodoList";

const theme = createTheme({
  palette: {
      primary: {
        main: '#3550b3',
      },
      secondary: {
        main: '#d47a00',
      },
      error: {
        main: '#f53325',
      },
    },
});

const App = () => {
  const state: RootState = useAppSelector((state: RootState) => state);
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <Button size="large" onClick={() => {dispatch({type: "ADD_TODO", payload: {id: "1", title: "Hello", todoItems: []}})}}>ADD TODO LIST</Button>
      <Button size="large" onClick={() => {dispatch({type: "REMOVE_TODO", payload: {id: "1"}})}}>REMOVE TODO LIST</Button>
      <Button size="large" onClick={() => {dispatch({type: "ADD_TODO_ITEM", payload: {id: "1", todoListId: "1", title: "Hello world"}})}}>ADD TODO ITEM</Button>
      <Button size="large" onClick={() => {dispatch({type: "REMOVE_TODO_ITEM", payload: {id: "1", todoListId: "1"}})}}>REMOVE TODO ITEM</Button>
    {state.todoList.todos.map((list) => {return <TodoList key={list.id} data={list}></TodoList>})}
    </ThemeProvider>
    </>
  );
}

export default App;
