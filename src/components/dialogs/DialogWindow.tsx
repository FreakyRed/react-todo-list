import { useState } from "react";
import styling from "styled-components"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import ListForm from "../forms/ListForm";

const Container = styling.div``

const DialogWindow = (props) => {
    return <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {props.description}
            </DialogContentText>
            <Container>
            <ListForm onClick={props.handleClose}></ListForm>
            </Container>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
}

export default DialogWindow;