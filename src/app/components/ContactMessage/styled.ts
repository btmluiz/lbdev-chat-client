import { alpha, IconButton, InputBase, lighten, styled } from "@mui/material";

export const Root = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

export const Header = styled("div")(({ theme }) => ({
  width: "100%",
  height: "62px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(0, 2.5),
  boxShadow: theme.shadows[1],
  backgroundColor: lighten(theme.palette.background.paper, 2 * 0.025),
}));

export const MessageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  overflow: "auto",
  padding: theme.spacing(0.5, 0, 0, 0),
  display: "flex",
  flexDirection: "column-reverse",
}));

export const MessageActionsBottom = styled("form")(({ theme }) => ({
  width: "100%",
  height: "60px",
  backgroundColor: lighten(theme.palette.background.paper, 2 * 0.025),
  padding: theme.spacing(1, 1.5),
  display: "flex",
  "& > *": {
    margin: theme.spacing(0, 0.5),
  },
}));

export const MessageInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  padding: theme.spacing(0, 1),
}));

export const MessageIconButton = styled(IconButton)(({ theme }) => ({}));

export const MessageWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  overflow: "auto",
}));

export const MessageScrollWrapper = styled("div")(() => ({}));

export type MessageProps = {
  direction: "received" | "send";
};

export const MessageBox = styled("div")<MessageProps>(
  ({ theme, direction }) => {
    let align;
    switch (direction) {
      case "received":
        align = "start";
        break;
      case "send":
        align = "end";
        break;
    }

    return {
      maxWidth: "58%",
      minWidth: "80px",
      alignSelf: align,
      margin: theme.spacing(0.2, 2),
    };
  }
);

export const MessageBoxWrapper = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.background.paper, 5 * 0.025),
  padding: theme.spacing(0.8, 1, 0.1),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  lineHeight: "1",
}));

export const MessageBoxContent = styled("div")(({ theme }) => ({
  wordBreak: "break-all",
}));

export const MessageBoxTime = styled("div")(({ theme }) => ({
  alignSelf: "end",
}));
