import { styled } from "@mui/material";

export const Form = styled("form")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const InputRow = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.8, 0),
}));
