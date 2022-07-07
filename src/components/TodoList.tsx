import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
} from "@mui/material";

import { useTheme } from "@mui/material";
import { styled } from "@mui/material";

import TodoItem from "./TodoItem";

const CustomAvatar = styled(Avatar)({
  backgroundColor: "black",
}) as typeof Avatar;

const TodoList = ({ data }) => {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<CustomAvatar>{data.id}</CustomAvatar>}
        title={data.title}
      ></CardHeader>
      <CardContent>
        <Typography>Content of the card</Typography>
        {data.todoItems.map((item) => {
          return <TodoItem data={item}></TodoItem>;
        })}
      </CardContent>
    </Card>
  );
};

export default TodoList;
