import update from "immutability-helper";
import { RootState } from "../store";

const INITIAL_STATE = {
  todos: [],
};

// TODO FIGURE THIS OUT
// export interface TodoState {
//   todos: TodoList[];
// }

// interface TodoList {
//   id: String;
//   todoItems: Array<TodoItem>;
// }

// interface TodoItem {
//   id: String;
//   todoListId: String;
//   title: String;
//   description: String;
//   finished: false;
//   deadline: Date;
// }

const findIndexById = (state, id) => {
  return state.todos.findIndex((el) => el.id === id);
};

export function todoListReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case "ADD_TODO":
      return update(state, {
        todos: {
          $push: [payload],
        },
      });
    case "REMOVE_TODO":
      return update(state, {
        todos: {
          $splice: [[findIndexById(state, payload.id), 1]],
        },
      });
    case "ADD_TODO_ITEM":
      return update(state, {
        todos: {
          [findIndexById(state, payload.todoListId)]: {
            todoItems: {
              $push: [payload],
            },
          },
        },
      });
    case "REMOVE_TODO_ITEM":
      return update(state, {
        todos: {
          [findIndexById(state, payload.todoListId)]: {
            todoItems: {
              $splice: [
                [
                  state.todos
                    .find((el) => el.id === payload.todoListId)
                    .todoItems.findIndex((el) => el.id === payload.id),
                  1,
                ],
              ],
            },
          },
        },
      });
    case "FINISH_TODO_ITEM":
      return update(state, {
        todos: {
          [findIndexById(state, payload.todoListId)]: {
            todoItems: {
              [state.todos
                .find((el) => el.id === payload.todoListId)
                .todoItems.findIndex((el) => el.id === payload.id)]: {
                ["finished"]: {$set: payload.finished},
              },
            },
          },
        },
      });
    default:
      return state;
  }
}
