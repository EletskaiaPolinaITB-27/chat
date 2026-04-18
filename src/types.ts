export interface IMessage {
  author: string;
  message: string;
}

export interface IMessageFull extends IMessage {
  id: string;
  likes?: number;
}

export interface ApiMessage {
  [key: string]: IMessage: {
    author: string;
    message: string;
    likes?: number;
  }
}