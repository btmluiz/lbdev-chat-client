import { Paper, styled } from "@mui/material";
import { motion } from "framer-motion";

export const Root = styled(motion.div)(({ theme }) => ({
  width: "40vw",
  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
}));

export const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0, 1, 0),
  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

export const Body = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(1, 0, 0),
}));

export const MessageResponse = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));
