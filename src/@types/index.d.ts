export type Contact = {
  pk: string;
  name: string;
  online: boolean;
};

type Message = {
  direction: "received" | "send";
  content: string;
  time: Date;
};

type WrapperViewProps = {
  setView: (viewType: "contact" | "component", data?: any) => void;
};
