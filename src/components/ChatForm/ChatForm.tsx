import {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {axiosApi} from '../../axiosApi.ts';
import type {IMessage, IMessageFull} from '../../types.ts';
import {useChatStore} from '../../chatStore.ts';

const initialState: IMessage = {
  author: '',
  message: '',
};

export const ChatForm = () => {
  const [form, setForm] = useState<IMessage>(initialState);
  const {messages, setMessages} = useChatStore();

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.author.trim() || !form.message.trim()) {
      return;
    }

    try {
      const messageData: IMessage = {
        author: form.author,
        message: form.message,
      }

      const response = await axiosApi.post<{name: string}>('/messages.json', messageData);

      const newMessage: IMessageFull = {
        id: response.data.name,
        ...messageData,
      };

      setMessages([...messages, newMessage]);
      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={submitForm} style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px'}}>
      <TextField
        label="Author"
        name="author"
        value={form.author}
        onChange={changeForm}
      />
      <TextField
        label="Message"
        name="message"
        value={form.message}
        onChange={changeForm}
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  )
}