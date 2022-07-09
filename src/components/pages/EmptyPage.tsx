import styling from "styled-components";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Typography } from "@mui/material";
import DialogController from "../dialogs/DialogController";

import { styled } from "@mui/material";

const Icon = styled(SentimentDissatisfiedIcon)({
  fontSize: "15rem",
  opacity: 0.75,
  color: "#d47a00",
});

const Container = styling.div`
    text-align: center;
    justify-content: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    & > * {
        padding: 1rem;
    }
`;

const EmptyPage = () => {
  return (
    <Container>
      <Icon></Icon>
      <Typography>Looks like you don't have any Todo Lists...</Typography>
      <DialogController text="Add ToDo"></DialogController>
    </Container>
  );
};

export default EmptyPage;
