import { useEffect, useState} from "react";
import axios from "axios";
import Parse from "parse/dist/parse.min.js";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { IconButton } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import DialogWindow from "../dialogs/DialogWindow";

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  "0SDxVYRX1k6XOKC7YzzP1ofhNAlNkpkvoqQxQrOw",
  "RTCNjOt6PybhEx6rtFMyK5SwvUyThYVqnMBngpfc"
);

const PersistState = () => {
  const state: RootState = useAppSelector((state: RootState) => state);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (props) => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://parseapi.back4app.com/classes/TodoLists/L6YPV0BMtm", {
        headers: {
          "X-Parse-Application-Id": "0SDxVYRX1k6XOKC7YzzP1ofhNAlNkpkvoqQxQrOw",
          "X-Parse-REST-API-Key": "oQmW5cbrP2bKtRqKap5M3yo8XKUAHPiGIhb7786F",
        },
      })
      .then((res) => {
        // console.log(res);
      });
  }, []);

  const postStateToAPI = async () => {
    const query = new Parse.Query("TodoLists");
    try {
      const object = await query.get("L6YPV0BMtm");
      object.set("todosString", JSON.stringify(state.todoList.todos));
    } catch (error) {
      //   console.error("Error while retrieving object TodoLists", error);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => {
          postStateToAPI();
          handleOpen();
        }}
        color="secondary"
        sx={{ backgroundColor: "#023047" }}
      >
        <StorageIcon fontSize="large"></StorageIcon>
      </IconButton>
      <DialogWindow
        persist={true}
        open={open}
        handleClose={handleClose}
        handleCancel={handleClose}
        title="State saved"
        description="State of the app has been saved to Back4App"
      ></DialogWindow>
    </>
  );
};

export default PersistState;
