import React from "react";
import { compose } from "redux";
import { ChatContext } from "@app/providers/chat";
import * as Styled from "./styled";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Contact } from "@types";
import ContactListItem from "@components/ContactListItem";
import ContactMessage from "@components/ContactMessage";

type Props = {};

type State = {
  inView?: {
    type: "contact" | "component";
    data: any;
  };
};

class ChatPage extends React.Component<Props, State> {
  static contextType = ChatContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      inView: undefined,
    };

    this.setView = this.setView.bind(this);
  }

  private setView(viewType: "contact" | "component", data?: any) {
    if (viewType === "contact" && data) {
      this.setState({
        inView: {
          type: "contact",
          data: data,
        },
      });
    }
  }

  render() {
    const {
      state: { inView },
      context: { chats, connected, connecting, tries },
    } = this;
    let statusMsg: JSX.Element | string;

    if (connected) {
      statusMsg = (
        <>
          <Styled.StatusBadge status={"connected"} />
          <Styled.StatusTypography>{"Connected"}</Styled.StatusTypography>
        </>
      );
    } else if (connecting) {
      statusMsg = (
        <>
          <Styled.StatusBadge status={"reconnecting"} />
          <Styled.StatusTypography>{`(${tries}) Reconnecting...`}</Styled.StatusTypography>
        </>
      );
    } else {
      statusMsg = (
        <>
          <Styled.StatusBadge status={"reconnecting"} />
          <Styled.StatusTypography>{"Disconnected"}</Styled.StatusTypography>
        </>
      );
    }

    return (
      <Styled.Root>
        <Styled.Container variant={"outlined"} elevation={3}>
          <Styled.Wrapper>
            <Styled.LeftSide>
              <Styled.Menu>
                <Styled.Search>
                  <Styled.IconWrapper>
                    <SearchIcon />
                  </Styled.IconWrapper>
                  <Styled.InputBase
                    placeholder={"Search..."}
                    inputProps={{ "aria-label": "search" }}
                  />
                </Styled.Search>
                <Divider />
                {chats.map((contact: Contact) => (
                  <React.Fragment key={contact.pk}>
                    <ContactListItem
                      contact={contact}
                      key={contact.pk}
                      setView={this.setView}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
              </Styled.Menu>
              <Styled.SocketStatus>{statusMsg}</Styled.SocketStatus>
            </Styled.LeftSide>
            <Divider orientation={"vertical"} />
            <Styled.RightSide>
              {inView && inView.type === "contact" ? (
                <ContactMessage
                  contact={chats.find((value: Contact) => {
                    if (value.pk === inView.data) return value;
                    return false;
                  })}
                />
              ) : undefined}
            </Styled.RightSide>
          </Styled.Wrapper>
        </Styled.Container>
        <Dialog open={!connected} aria-labelledby={"connection-fail"}>
          <DialogTitle id={"connection-fail"}>
            {"Ops... Something went wrong."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Styled.DialogText>
                <CircularProgress size={20} />
                {`Reconnecting...`}
              </Styled.DialogText>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Styled.Root>
    );
  }
}

export default compose<any>()(ChatPage);
