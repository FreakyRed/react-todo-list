import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";

import { useState } from "react";

import { useTheme } from "@mui/material";
import { styled } from "@mui/material";

import TodoItem from "./TodoItem";
import ClearIcon from "@mui/icons-material/Clear";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useAppDispatch } from "../store/hooks";
import styling from "styled-components";

import { v4 as uuid } from "uuid";

import DialogWindow from "./dialogs/DialogWindow";

const CustomAvatar = styled(Avatar)({
  backgroundColor: "black",
}) as typeof Avatar;

const CustomCardHeader = styled(CardHeader)({
  backgroundColor: "blue",
}) as typeof CardHeader;

const CustomIconButton = styling(IconButton)`
  justify-content: center;
  text-align: center;
  color: red;
`;

const Container = styling.div`
  display: flex;
  justify-content: center;
`;

const CustomDivider = styled(Divider)`
  width: 100%;
`;

const TodoList = ({ data }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  //Dialog handling
  const [openItemDialog, setOpenItemDialog] = useState(false);

  const handleOpenItem = () => {
    setOpenItemDialog(true);
  };

  const handleCloseItem = (props) => {
    setOpenItemDialog(false);
    dispatch({
      type: "ADD_TODO_ITEM",
      payload: {
        id: uuid(),
        title: props.title,
        todoListId: props.todoListId,
        description: props.description,
        deadline: props.deadline.toString(),
      },
    });
  };

  const handleCloseCancelItem = () => {
    setOpenItemDialog(false);
  };

  const dispatchRemove = ({ id }) => {
    dispatch({ type: "REMOVE_TODO", payload: { id: id } });
  };

  return (
    <Card variant="outlined">
      <CustomCardHeader
        avatar={<CustomAvatar>{data.title[0]}</CustomAvatar>}
        title={data.title}
        action={
          <IconButton
            onClick={() => {
              dispatchRemove({ id: data.id });
            }}
          >
            <ClearIcon></ClearIcon>
          </IconButton>
        }
      ></CustomCardHeader>
      <CardContent>
        {data.todoItems.map((item) => {
          return (
            <>
              <CustomDivider/>
              <TodoItem data={item} key={item.id}></TodoItem>
              <CustomDivider/>
            </>
          );
        })}
        <Container>
          <CustomIconButton onClick={handleOpenItem} color="secondary">
            <AddBoxIcon fontSize="large"></AddBoxIcon>
          </CustomIconButton>
        </Container>
      </CardContent>
      <DialogWindow
        open={openItemDialog}
        title="Add an item"
        description="Please fill the following fields"
        handleClose={(props) => {
          handleCloseItem({ ...props, todoListId: data.id });
        }}
        handleCancel={handleCloseCancelItem}
      ></DialogWindow>
    </Card>
  );
};

export default TodoList;
