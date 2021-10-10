import React from "react";
import { RouterProps, withRouter } from "react-router-dom";
import ChatPage from "@pages/chat";
import { compose } from "redux";
import ChatProvider from "@app/providers/chat";

type Props = RouterProps & {};

class ChatRoute extends React.Component<Props> {
  render() {
    return (
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    );
  }
}

export default compose<any>(withRouter)(ChatRoute);
