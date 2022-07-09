import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

import TodoList from "./components/TodoList";
import DialogController from "./components/dialogs/DialogController";
import EmptyPage from "./components/pages/EmptyPage";
import styling from "styled-components"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3550b3",
    },
    secondary: {
      main: "#d47a00",
    },
    error: {
      main: "#f53325",
    },
  },
});

const FloatingButton = styling.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const App = () => {
  const state: RootState = useAppSelector((state: RootState) => state);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {state.todoList.todos.length === 0 ? (
          <EmptyPage></EmptyPage>
        ) : (
          state.todoList.todos.map((list) => {
            return (
              <>
                <DialogController text="+"></DialogController>
                <TodoList key={list.id} data={list}></TodoList>
              </>
            );
          })
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
