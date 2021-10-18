import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const Root = styled(motion.div)(() => ({
  width: "100%",
  height: "100%",
}));

export const RootWrapper = styled(motion.div)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  position: "relative",
}));

export const ViewContainer = styled(motion.div)(({ theme }) => ({
  width: "70%",
  height: "100%",
  background: "orange",
  clipPath: "polygon(95% 0%, 0% 0%, 0% 100%, 95% 100%, 100% 20%)",
  position: "absolute",
  zIndex: 1000,
  left: 0,
  top: 0,
  [theme.breakpoints.down("md")]: {
    width: "10%",
    clipPath: "polygon(-45% 0%, 0% 0%, 0% 100%, -303% 100%, 100% 20%)",
  },
}));

export const ViewContainerWrapper = styled(motion.div)(({ theme }) => ({
  width: "calc(100% - 2px)",
  height: "100%",
  background: "black",
  clipPath: "polygon(95% 0%, 0% 0%, 0% 100%, 95% 100%, 100% 20%)",
  [theme.breakpoints.down("md")]: {
    clipPath: "polygon(-45% 0%, 0% 0%, 0% 100%, -303% 100%, 100% 20%)",
  },
}));

export const AuthContainer = styled(motion.div)(({ theme }) => ({
  width: "40%",
  height: "100%",
  background: "white",
  position: "absolute",
  right: 0,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
