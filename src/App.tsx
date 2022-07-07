import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch} from "./store/hooks";
import { RootState, AppDispatch } from "./store/store";

import { Button } from "@mui/material";

function App() {
  const state: RootState = useAppSelector((state: RootState) => state);
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <Button size="large" onClick={() => {dispatch({type: "ADD_TODO", payload: {id: "1", todoItems: []}})}}>ADD TODO LIST</Button>
      <Button size="large" onClick={() => {dispatch({type: "REMOVE_TODO", payload: {id: "1"}})}}>REMOVE TODO LIST</Button>
      <Button size="large" onClick={() => {dispatch({type: "ADD_TODO_ITEM", payload: {id: "1", todoListId: "1", title: "Hello world"}})}}>ADD TODO ITEM</Button>
      <Button size="large" onClick={() => {dispatch({type: "REMOVE_TODO_ITEM", payload: {id: "1", todoListId: "1"}})}}>REMOVE TODO ITEM</Button>
    </div>
  );
}

export default App;
