import { ButtonBase, styled, Typography } from "@mui/material";

export const Root = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(0.5, 0),
  textAlign: "initial",
}));

export const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  padding: theme.spacing(1, 1.5),
  flexDirection: "column",
}));

export const ContactName = styled(Typography)(({ theme }) => ({}));
export const LastMessage = styled(Typography)(({ theme }) => ({
  width: "90%",
  height: 20,
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
