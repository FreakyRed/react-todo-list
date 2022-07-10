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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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

const ItemContainer = styling.div`
  margin: 4rem 0 0 1rem;
`;

const filterFunc = (filter, item) => {
  if (filter === "ALL") {
    return item;
  } else if (filter === "ACTIVE") {
    return !item.finished;
  } else {
    return item.finished;
  }
};

const TodoList = ({ data }) => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  //Dialog handling
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [openConfirmDialog, setConfirmDialog] = useState(false);

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
    setConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setConfirmDialog(true);
  };

  const handleCancelConfirmDialog = () => {
    setConfirmDialog(false);
  };

  return (
    <Card variant="outlined" key={data.id}>
      <CustomCardHeader
        key={"header" + data.id}
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
            <IconButton onClick={handleOpenConfirmDialog} color="secondary">
              <ClearIcon></ClearIcon>
            </IconButton>
          </>
        }
      ></CustomCardHeader>
      <CardContent>
        {data.todoItems.filter((item) => {
          return filterFunc(filter, item);
        }).length > 0 ? (
          <Autocomplete
            disablePortal
            id={"search" + data.id}
            options={data.todoItems
              .filter((item) => {
                return filterFunc(filter, item);
              })
              .map((item) => item.title)}
            sx={{ width: 200, position: "absolute", right: "13.5vw" }}
            onInputChange={(event, value, reason) => {
              reason === "reset" ? setSearch("") : setSearch(value.toString());
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search"
                color="secondary"
              />
            )}
          />
        ) : (
          <></>
        )}
        {data.todoItems
          .filter((item) => {
            if (search == "") {
              return item;
            } else {
              return item.title.toLowerCase().includes(search.toLowerCase());
            }
          })
          .filter((item) => {
            return filterFunc(filter, item);
          })
          .map((item) => {
            return (
              <ItemContainer>
                <TodoItem data={item} key={item.id}></TodoItem>
                <CustomDivider />
              </ItemContainer>
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
      <DialogWindow
        open={openConfirmDialog}
        title="Remove Todo List"
        description="Do you wish to remove this Todo?"
        handleClose={(props) => {
          dispatchRemove({ ...props, id: data.id });
        }}
        handleCancel={handleCancelConfirmDialog}
        confirm={true}
      ></DialogWindow>
    </Card>
  );
};

export default TodoList;
