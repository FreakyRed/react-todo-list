import { useState } from "react";
import styling from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ListForm from "../forms/ListForm";
import ItemForm from "../forms/ItemForm";

const Container = styling.div`
`;

const DialogWindow = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        <Container>
          {props.list ? (
            <ListForm handleClose={props.handleClose}></ListForm>
          ) : (
            <ItemForm handleClose={props.handleClose}></ItemForm>
          )}
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
