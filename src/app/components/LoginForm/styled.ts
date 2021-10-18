import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const Form = styled("form")(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const InputRow = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(0.75, 0),
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
