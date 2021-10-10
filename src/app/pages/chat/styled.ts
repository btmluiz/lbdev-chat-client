import {
  alpha,
  InputBase as MuiInputBase,
  lighten,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import theme from "@theme";
import { green, red, yellow } from "@mui/material/colors";

export const Root = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2, 4),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
  },
}));

export const Container = styled(Paper)(({ theme, elevation = 0 }) => ({
  width: "100%",
  height: "100%",
  boxShadow: theme.shadows[elevation],
  backgroundColor: lighten(theme.palette.background.paper, elevation * 0.025),
  [theme.breakpoints.down("md")]: {
    width: "96%",
  },
  [theme.breakpoints.up("md")]: {
    width: "92%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "1250px",
  },
}));

export const Wrapper = styled("div")((theme) => ({
  width: "100%",
  height: "100%",
  display: "flex",
}));

export const LeftSide = styled("div")((theme) => ({
  width: "30%",
  height: "100%",
  position: "relative",
}));

export const RightSide = styled("div")((theme) => ({
  width: "100%",
  height: "100%",
}));

export const Menu = styled("div")((theme) => ({
  width: "100%",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  margin: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export const IconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const InputBase = styled(MuiInputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export const SocketStatus = styled("div")(({ theme }) => ({
  width: "100%",
  height: "35px",
  backgroundColor: theme.palette.background.paper,
  borderBottomLeftRadius: theme.shape.borderRadius,
  position: "absolute",
  bottom: 0,
  padding: theme.spacing(0.5, 2),
  display: "flex",
  alignItems: "center",
  "& > *": {
    marginRight: theme.spacing(0.8),
  },
}));

type StatusBadgeProps = {
  status: "connected" | "disconnected" | "reconnecting";
};

export const StatusBadge = styled("div")<StatusBadgeProps>(
  ({ theme, status }) => {
    let color;

    if (status === "connected") {
    }
    switch (status) {
      case "connected":
        color = green.A400;
        break;
      case "disconnected":
        color = red.A400;
        break;
      case "reconnecting":
        color = yellow["700"];
        break;
    }

    return {
      width: 13,
      height: 13,
      backgroundColor: color,
      borderRadius: "100%",
    };
  }
);

export const StatusTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItem: "center",
}));

export const DialogText = styled("div")(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  "& > *": {
    margin: theme.spacing(0, 1, 0, 0),
  },
}));
