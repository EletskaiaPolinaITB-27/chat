import {create} from 'zustand'
import type {IMessageFull} from './types.ts';

interface ChatStore {
  messages: IMessageFull[]
  setMessages(messages: IMessageFull[]): void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  setMessages: (messages) => set({messages: messages}),
}))