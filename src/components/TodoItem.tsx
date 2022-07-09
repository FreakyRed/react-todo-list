import styling from "styled-components";
import { Typography } from "@mui/material";

import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "../store/hooks";

const Container = styling.div`
`;

const TodoItem = ({ data }) => {
  const dispatch = useAppDispatch();

  const dispatchRemoveItem = (props) => {
    dispatch({
      type: "REMOVE_TODO_ITEM",
      payload: { id: props.id, todoListId: props.todoListId },
    });
  };

  return (
    <Container>
      <Typography>{data.title}</Typography>
      <Typography>{data.description}</Typography>
      <Typography>{data.deadline}</Typography>
      <IconButton
        onClick={() => {
          dispatchRemoveItem({ id: data.id, todoListId: data.todoListId });
        }}
      >
        <ClearIcon></ClearIcon>
      </IconButton>
    </Container>
  );
};

export default TodoItem;
