import styling from "styled-components";
import DialogController from "../dialogs/DialogController";
import TodoList from "./TodoList";

import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import PersistState from "../persister/PersistState";

const FloatingButton = styling.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 2rem;
`;

const FloatingButtonPersist = styling.div`
position: fixed;
bottom: 0;
right: 0;
margin: 2rem 2rem 6rem 2rem;
`

const Container = styling.div`
    max-width: 100%;
    margin: 1rem 12.5% 0 12.5%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const CustomTodoList = styling(TodoList)`
    max-width: 75%;
`;

const TodoWrapper = () => {
  const state: RootState = useAppSelector((state: RootState) => state);

  return (
    <Container>
      <FloatingButton>
        <DialogController absolute={true}></DialogController>
      </FloatingButton>
      <FloatingButtonPersist>
        <PersistState></PersistState>
      </FloatingButtonPersist>
      {state.todoList.todos.map((list) => {
        return (
          <CustomTodoList key={"custom" + list.id} data={list}></CustomTodoList>
        );
      })}
    </Container>
  );
};

export default TodoWrapper;
