import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";

import EmptyPage from "./components/pages/EmptyPage";
import TodoWrapper from "./components/todos/TodoWrapper";

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

const App = () => {
  const state: RootState = useAppSelector((state: RootState) => state);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {state.todoList.todos.length === 0 ? 
          <EmptyPage></EmptyPage> : <TodoWrapper></TodoWrapper>
        }
      </ThemeProvider>
    </>
  );
};

export default App;
