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
  margin: 1rem 0 -1rem 0;
`;

const CustomButton = styling(Button)`
  width: 100%;
`

const DialogWindow = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        <Container>
          {props.confirm ? (
            <CustomButton onClick={props.handleClose} color="primary" variant="contained">Remove</CustomButton>
          ) : props.list ? (
            <ListForm handleClose={props.handleClose}></ListForm>
          ) : props.persist ? (<></>) :
          (
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
