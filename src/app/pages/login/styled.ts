import { Paper, styled } from "@mui/material";

export const Root = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Paper, {
  slot: "Root",
})(({ theme }) => ({
  width: "40%",
  height: "contents",
  padding: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
}));
