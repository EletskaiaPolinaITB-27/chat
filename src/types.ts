export interface IMessage {
  author: string;
  message: string;
}

export interface IMessageFull extends IMessage {
  id: string;
}

export interface ApiMessage {
  [key: string]: IMessage;
}