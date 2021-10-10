import { styled } from "@mui/material";

export const Form = styled("form")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const Header = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 1, 0),
}));

export const Body = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(1, 0, 0),
}));

export const Footer = styled("div")(({ theme }) => ({}));

export const InputRow = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 0, 0),
}));

export const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 0),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const LeftButton = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

export const RightButton = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));
