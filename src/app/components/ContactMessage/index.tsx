import React from "react";
import { Contact, Message } from "@types";
import * as Styled from "./styled";
import { compose } from "redux";
import { Typography } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ChatContext } from "@app/providers/chat";
import TimeView from "@components/TimeView";

type Props = {
  contact: Contact;
};

type State = {};

class ContactMessage extends React.Component<Props, State> {
  static contextType = ChatContext;
  messageRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    document.addEventListener("keypress", this.focusMessageInput);
  }

  focusMessageInput = () => {
    if (this.messageRef.current) {
      this.messageRef.current.focus();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keypress", this.focusMessageInput);
  }

  private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();

    const {
      props: { contact },
      context: { sendMessage },
      messageRef: { current: messageInput },
    } = this;

    if (messageInput) {
      if (messageInput.value !== "") {
        sendMessage(contact.pk, messageInput.value);
      }
      messageInput.value = "";
    }
  };

  render() {
    const {
      context: { messages: contextMessages },
      props: { contact },
    } = this;

    const messages: Message[] = contextMessages[contact.pk] ?? [];

    messages.sort((a, b) => {
      return a.time.getTime() - b.time.getTime();
    });

    return (
      <Styled.Root>
        <Styled.Wrapper>
          <Styled.Header>
            <Typography>{`${contact.name}`}</Typography>
            <Typography variant={"caption"}>
              {contact.online ? "Online" : ""}
            </Typography>
          </Styled.Header>
          <Styled.MessageContainer>
            <Styled.MessageScrollWrapper>
              <Styled.MessageWrapper>
                {messages.map((message: Message, index) => (
                  <Styled.MessageBox direction={message.direction} key={index}>
                    <Styled.MessageBoxWrapper>
                      <Styled.MessageBoxContent>
                        {message.content}
                      </Styled.MessageBoxContent>
                      <Styled.MessageBoxTime>
                        <Typography variant={"caption"} fontSize={11}>
                          <TimeView date={message.time} />
                        </Typography>
                      </Styled.MessageBoxTime>
                    </Styled.MessageBoxWrapper>
                  </Styled.MessageBox>
                ))}
                <div style={{ height: 10 }} />
              </Styled.MessageWrapper>
            </Styled.MessageScrollWrapper>
          </Styled.MessageContainer>
          <Styled.MessageActionsBottom onSubmit={this.onSubmit}>
            <Styled.MessageInput
              placeholder={"Type something"}
              inputRef={this.messageRef}
            />
            <Styled.MessageIconButton type={"submit"}>
              <SendIcon />
            </Styled.MessageIconButton>
          </Styled.MessageActionsBottom>
        </Styled.Wrapper>
      </Styled.Root>
    );
  }
}

export default compose<typeof ContactMessage>()(ContactMessage);
