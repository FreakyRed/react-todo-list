import { Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {AppDispatch} from "../../store/store";

import DialogWindow from "./DialogWindow";

const DialogController = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [openListDialog, setOpenListDialog] = useState(false);

  const handleOpen = () => {
    setOpenListDialog(true);
  };

  const handleClose = (props) => {
    setOpenListDialog(false);
    dispatch({
      type: "ADD_TODO",
      payload: { id: "1", title: props.title, todoItems: [] },
    });
  };

  const handleCloseCancel = () => {
    setOpenListDialog(false);
  };

  return <>
  <Button onClick={handleOpen}>OPEN DIALOG</Button>
  <DialogWindow open={openListDialog} handleClose={handleClose} handleCancel={handleCloseCancel}></DialogWindow>
  </>
};

export default DialogController;
