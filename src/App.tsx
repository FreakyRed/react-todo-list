import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme} from "@mui/material";

import EmptyPage from "./components/pages/EmptyPage";
import TodoWrapper from "./components/todos/TodoWrapper";
import Parse from "parse/dist/parse.min.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#023047",
    },
    secondary: {
      main: "#ffb703",
    },
    error: {
      main: "#f53325",
    },
  },
});

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  "0SDxVYRX1k6XOKC7YzzP1ofhNAlNkpkvoqQxQrOw",
  "RTCNjOt6PybhEx6rtFMyK5SwvUyThYVqnMBngpfc", 
);

const App = () => {
  const state: RootState = useAppSelector((state: RootState) => state);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {state.todoList.todos.length === 0 ? (
            <EmptyPage></EmptyPage>
        ) : (
          <TodoWrapper></TodoWrapper>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
