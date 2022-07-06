import {  PayloadAction } from "@reduxjs/toolkit";

const todoLists = {
  todos: [] as TodoList[],
};

interface TodoList {
  id: String;
  todoItems: Array<TodoItem>;
}

interface TodoItem {
  id: String;
  todoListId: String;
  title: String;
  description: String;
  deadline: Date;
}

export function todoListreducer(
  state = todoLists,
{type, payload}
) {
  switch (type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== payload.id),
      };
    default:
      return state;
  }
}

export function todoItemReducer(
  state = todoLists,
  {type, payload}
) {
  switch (type) {
    case "ADD_TODO_ITEM":
      return {
        ...state,
        todos: [
          ...state.todos,
          state.todos
            .find((item) => item.id === payload.todoListId)
            ?.todoItems.concat(payload),
        ],
      };
    case "REMOVE_TODO_ITEM":
      return {
        ...state,
        todos: [
          ...state.todos,
          state.todos
            .find((item) => item.id === payload.todoListId)
            ?.todoItems.filter((item) => item.id !== payload.id),
        ],
      };
  }
}
