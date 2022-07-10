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
import { styled } from "@mui/material";
import TodoItem from "./TodoItem";
import ClearIcon from "@mui/icons-material/Clear";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppDispatch } from "../../store/hooks";
import styling from "styled-components";
import { v4 as uuid } from "uuid";
import DialogWindow from "../dialogs/DialogWindow";
import ItemFilter from "../filters/ItemFilter";

const CustomAvatar = styled(Avatar)({
  backgroundColor: "#ffb703",
}) as typeof Avatar;

const CustomCardHeader = styled(CardHeader)({
  backgroundColor: "#023047",
}) as typeof CardHeader;

const CustomIconButton = styling(IconButton)`
  justify-content: center;
  text-align: center;
  color: red;
`;

const Container = styling.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0 -1rem;
`;

const CustomDivider = styled(Divider)`
  width: 100%;
  margin: 1rem 0rem 1rem 0;
`;

const TodoList = ({ data }) => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState("ALL");

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
        finished: props.finished || false,
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
    <Card variant="outlined" key={data.id}>
      <CustomCardHeader
        avatar={
          <CustomAvatar>
            <Typography color="primary">{data.title[0]}</Typography>
          </CustomAvatar>
        }
        title={data.title}
        titleTypographyProps={{
          variant: "h4",
          color: "secondary",
          fontWeight: "bold",
        }}
        action={
          <>
            <ItemFilter setFilter={setFilter}></ItemFilter>
            <IconButton
              onClick={() => {
                dispatchRemove({ id: data.id });
              }}
              color="secondary"
            >
              <ClearIcon></ClearIcon>
            </IconButton>
          </>
        }
      ></CustomCardHeader>
      <CardContent>
        {data.todoItems
          .filter((item) => {
            if (filter === "ALL") {
              return item;
            } else if (filter === "ACTIVE") {
              return !item.finished;
            } else {
              return item.finished;
            }
          })
          .map((item) => {
            return (
              <>
                <TodoItem data={item} key={item.id}></TodoItem>
                <CustomDivider />
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