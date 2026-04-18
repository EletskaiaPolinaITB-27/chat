export interface IMessage {
  author: string;
  message: string;
}

export interface IMessageFull extends IMessage {
  id: string;
  likes?: number;
}

export interface ApiMessage {
  [key: string]: {
    author: string;
    message: string;
    likes?: number;
  }
}