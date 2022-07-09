import { Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { AppDispatch } from "../../store/store";

import { v4 as uuid } from "uuid";

import DialogWindow from "./DialogWindow";

const DialogController = (props) => {
  const dispatch: AppDispatch = useAppDispatch();
  const [openListDialog, setOpenListDialog] = useState(false);

  const handleOpen = () => {
    setOpenListDialog(true);
  };

  const handleClose = (props) => {
    setOpenListDialog(false);
    dispatch({
      type: "ADD_TODO",
      payload: { id: uuid(), title: props.title, todoItems: [] },
    });
  };

  const handleCloseCancel = () => {
    setOpenListDialog(false);
  };

  return (
    <>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        {props.text}
      </Button>
      <DialogWindow
        list={true}
        open={openListDialog}
        title={props.title || "Add a ToDo list"}
        description={props.title || "Please fill in the title"}
        handleClose={handleClose}
        handleCancel={handleCloseCancel}
      ></DialogWindow>
    </>
  );
};

export default DialogController;
