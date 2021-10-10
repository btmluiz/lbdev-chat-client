import React from "react";
import { compose } from "redux";
import * as Styled from "./styled";
import { Contact, Message, WrapperViewProps } from "@types";
import { ChatContext } from "@app/providers/chat";

type Props = { contact: Contact; setView?: WrapperViewProps["setView"] };
type State = {
  messages: Message[];
};

class ContactListItem extends React.Component<Props, State> {
  static contextType = ChatContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.onClick = this.onClick.bind(this);
  }

  private onClick() {
    const {
      props: { contact, setView },
    } = this;

    if (setView) {
      setView("contact", contact.pk);
    }
  }

  render() {
    const {
      props: { contact },
      context: { messages: allMessages },
    } = this;

    const messages = allMessages[contact.pk] ?? [];
    let lastMessage = " ";
    if (messages.length > 0) {
      lastMessage = messages[messages.length - 1].content;
    }
    return (
      <Styled.Root onClick={this.onClick}>
        <Styled.Wrapper>
          <Styled.ContactName>{`${contact.name}`}</Styled.ContactName>
          <Styled.LastMessage variant={"caption"}>
            {lastMessage ?? " "}
          </Styled.LastMessage>
        </Styled.Wrapper>
      </Styled.Root>
    );
  }
}

export default compose<any>()(ContactListItem);
