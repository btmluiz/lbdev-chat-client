import { Paper, styled } from "@mui/material";
import { motion } from "framer-motion";

export const Root = styled(motion.div)(() => ({
  width: `100%`,
  height: "100%",
}));

export const Wrapper = styled(motion.div)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Paper, {
  slot: "Root",
})(({ theme }) => ({
  padding: theme.spacing(1.5),
  overflowX: "hidden",
}));

export const ContainerWrapper = styled("div")(() => ({
  display: "inline-flex",
}));
