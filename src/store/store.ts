import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { todoListreducer, todoItemReducer } from "./reducers/todoReducer";


export const store = configureStore({
  reducer: {
    todoList: todoListreducer,
    todoItem: todoItemReducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
