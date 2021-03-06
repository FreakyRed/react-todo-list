import update from "immutability-helper";

const INITIAL_STATE = {
  todos: [],
};

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
                finished: { $set: payload.finished },
              },
            },
          },
        },
      });
    default:
      return state;
  }
}
