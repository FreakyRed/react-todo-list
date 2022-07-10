import styling from "styled-components";
import { Typography } from "@mui/material";
import {useState} from "react"
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { useAppDispatch } from "../../store/hooks";
import DialogWindow from "../dialogs/DialogWindow";

const Container = styling.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DataContainer = styling.div`
  flex: 5;
  margin: 0 1rem 1rem 1rem;
  align-self: center;
`;

const ButtonContainer = styling.div`
  flex: 2;
  align-self: center;
  text-align: right;
`;

const TodoItem = ({ data }) => {
  const dispatch = useAppDispatch();
  const [openConfirmDialog, setConfirmDialog] = useState(false);

  const handleOpenConfirmDialog = () => {
    setConfirmDialog(true);
  };

  const handleCancelConfirmDialog = () => {
    setConfirmDialog(false);
  };

  const dispatchRemoveItem = (props) => {
    dispatch({
      type: "REMOVE_TODO_ITEM",
      payload: { id: props.id, todoListId: props.todoListId },
    });
    setConfirmDialog(false);
  };

  const dispatchFinishedItem = (props) => {
    dispatch({
      type: "FINISH_TODO_ITEM",
      payload: {
        id: props.id,
        todoListId: props.todoListId,
        finished: props.finished,
      },
    });
  };

  return (
    <Container>
      <DataContainer>
        <Typography variant="h5" fontWeight="bold" color="primary">
          {data.title}
        </Typography>
        <Typography variant="h6">{data.description}</Typography>
        {!data.finished ? (
          <>
            <Typography fontWeight="bold" color="primary">
              Deadline:
            </Typography>
            <Typography>{data.deadline}</Typography>
          </>
        ) : (
          <></>
        )}
      </DataContainer>
      <ButtonContainer>
        <IconButton
          onClick={handleOpenConfirmDialog}
        >
          <ClearIcon fontSize="large"></ClearIcon>
        </IconButton>
        <IconButton
          color={data.finished ? "secondary" : "primary"}
          onClick={() => {
            dispatchFinishedItem({
              id: data.id,
              todoListId: data.todoListId,
              finished: !data.finished,
            });
          }}
        >
          {data.finished ? (
            <CheckCircleIcon fontSize="large"></CheckCircleIcon>
          ) : (
            <CheckIcon fontSize="large"></CheckIcon>
          )}
        </IconButton>
      </ButtonContainer>
      <DialogWindow
        open={openConfirmDialog}
        title="Remove Todo Item"
        description="Do you wish to remove this Todo item?"
        handleClose={(props) => {
          dispatchRemoveItem({ ...props, id: data.id, todoListId: data.todoListId });
        }}
        handleCancel={handleCancelConfirmDialog}
        confirm={true}
      ></DialogWindow>
    </Container>
  );
};

export default TodoItem;
