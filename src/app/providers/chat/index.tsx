import React from "react";
import AuthService from "@services/auth";
import { Contact, Message } from "@types";
import notification from "@sources/sounds/nofication.mp3";

export const ChatContext = React.createContext<ContextState>({
  chats: [],
  connected: false,
  connecting: false,
  tries: 0,
  sendMessage: () => {},
  messages: {},
});

type Props = {};

type ContextState = {
  chats: Contact[];
  connected: boolean;
  connecting: boolean;
  tries: number;
  messages: ChatRegister;
  sendMessage: (to: string | number, content: string) => void;
};

type ChatRegister = {
  [x: string | number]: Message[];
};

type State = ContextState & {
  audioNotification?: HTMLAudioElement;
};

class ChatProvider extends React.Component<Props, State> {
  private socket!: WebSocket;
  private readonly maxTry = 3;
  private readonly resolvers: any = {
    authorization_response: this.authorizationResponse,
    get_contacts_response: this.getContactsResponse,
    message: this.messageReceive,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      chats: [],
      connected: false,
      connecting: false,
      tries: 0,
      sendMessage: () => {},
      messages: {},
      audioNotification: new Audio(notification),
    };

    this.onSocketOpen = this.onSocketOpen.bind(this);
    this.onSocketMessage = this.onSocketMessage.bind(this);
    this.onSocketClose = this.onSocketClose.bind(this);
    this.onSocketError = this.onSocketError.bind(this);
  }

  componentDidMount() {
    this.socketInitialize();
  }

  private socketInitialize() {
    this.connecting = true;
    this.socket = new WebSocket(process.env.REACT_APP_CHAT_URL!);
    this.socketDefineDefault();
  }

  private socketDefineDefault() {
    const {
      socket,
      onSocketOpen,
      onSocketMessage,
      onSocketClose,
      onSocketError,
    } = this;
    socket.onopen = onSocketOpen;
    socket.onmessage = onSocketMessage;
    socket.onclose = onSocketClose;
    socket.onerror = onSocketError;
  }

  set connecting(value: boolean) {
    this.setState({ connecting: value });
  }

  private setConnected() {
    this.setState({
      connected: true,
      connecting: false,
      tries: 0,
    });
  }

  private setDisconnected() {
    this.setState({
      connected: false,
      connecting: false,
    });
  }

  private onSocketOpen() {
    this.setConnected();
    this.sendRequest("authorization", {
      token: AuthService.token,
    });
  }

  private onSocketMessage(e: MessageEvent) {
    const data = JSON.parse(e.data);
    // console.log(data);
    if (data.type in this.resolvers) {
      const func = this.resolvers[data.type].bind(this);
      func(data.data);
    } else if (data.type !== "info") {
      console.log(`type (${data.type}) not implemented`);
    }
  }

  private onSocketClose() {
    this.setDisconnected();
    this.socketTryReconnect();
  }

  private onSocketError() {
    this.setDisconnected();
    this.socketTryReconnect();
  }

  private socketTryReconnect() {
    const { tries, connecting } = this.state;

    if (tries < this.maxTry && !connecting) {
      this.setState((prevState) => ({
        connecting: true,
        tries: prevState.tries + 1,
      }));

      setTimeout(() => {
        this.socketInitialize();
      }, 5000);
    }
  }

  private authorizationResponse(data: any) {
    if (data.status === "success") {
      this.sendRequest("get_contacts", {});
    }
  }

  private getContactsResponse(data: any) {
    console.log(data);
    this.setState({ chats: data });
  }

  private sendRequest(type: string, data: any) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          type: type,
          data: data,
        })
      );
    }
  }

  private sendMessage(to: string | number, content: string) {
    this.sendRequest("message", {
      to: to,
      content: content,
    });
  }

  private messageReceive(resp: any) {
    const { pk, data } = resp;
    const {
      state: { audioNotification },
    } = this;

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    if (
      Notification.permission === "granted" &&
      data.direction === "received"
    ) {
      new Notification("teste", {
        body: data.content,
      });
    }

    if (audioNotification && data.direction === "received") {
      audioNotification.play();
    }

    data.time = new Date(data.time);

    this.setState((prevState) => {
      const prevMessages = prevState.messages[pk] ?? [];

      return {
        messages: {
          ...prevState.messages,
          [pk]: [...prevMessages, data],
        },
      };
    });
  }

  render() {
    const {
      props: { children },
      state: { chats, connected, connecting, tries, messages },
      sendMessage,
    } = this;
    return (
      <ChatContext.Provider
        value={{
          chats: chats,
          connected: connected,
          connecting: connecting,
          tries: tries,
          sendMessage: sendMessage.bind(this),
          messages: messages,
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
