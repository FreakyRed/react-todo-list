import { Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { AppDispatch } from "../../store/store";


import DialogWindow from "./DialogWindow";

const DialogController = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [openListDialog, setOpenListDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);

  const handleOpen = () => {
    setOpenListDialog(true);
  };

  const handleOpenItem = () => {
    setOpenItemDialog(true);
  };

  const handleClose = (props) => {
    setOpenListDialog(false);
    dispatch({
      type: "ADD_TODO",
      payload: { id: "1", title: props.title, todoItems: [] },
    });
  };

  const handleCloseItem = (props) => {
    setOpenItemDialog(false);
    dispatch({
      type: "ADD_TODO_ITEM",
      payload: { id: "1", title: props.title, todoListId: "1", description: "Hello" },
    });
  };

  const handleCloseCancel = () => {
    setOpenListDialog(false);
  };

  const handleCloseCancelItem = () => {
    setOpenItemDialog(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>OPEN DIALOG</Button>
      <Button onClick={handleOpenItem}>OPEN DIALOG ITEM</Button>
      <DialogWindow
        open={openItemDialog}
        handleClose={handleCloseItem}
        handleCancel={handleCloseCancelItem}
      ></DialogWindow>
      <DialogWindow
      list={true}
        open={openListDialog}
        handleClose={handleClose}
        handleCancel={handleCloseCancel}
      ></DialogWindow>
    </>
  );
};

export default DialogController;
