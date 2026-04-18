import {useEffect, useState} from 'react';
import type {ApiMessage, IMessageFull} from '../../types.ts';
import {axiosApi} from '../../axiosApi.ts';
import styles from './styles.module.css';
import {useChatStore} from '../../chatStore.ts';

export const MessagesList = () => {
  const {messages, setMessages} = useChatStore();

  useEffect(() => {
    const getMessages = async() => {
      try {
        const response = await axiosApi<ApiMessage>('/messages.json');
        const data = response.data;

        if (!data) {
          return
        }

        const newMessages:IMessageFull[] = Object.keys(data).map(key => {
          const newMessage = data[key];
          return {
            ...newMessage,
            id: key,
          }
        });
        setMessages(newMessages);

      } catch (e) {
        console.log(e);
      }
    }

    getMessages();

    const interval = setInterval(getMessages, 5000);
    return () => {
      clearInterval(interval);
    }

  },[setMessages])

  const likeMessage = async (message: IMessageFull) => {
    try {
      const updatedMessage = {
        author: message.author,
        message: message.message,
        likes: (message.likes || 0) + 1,
      };

      await axiosApi.put(`/messages/${message.id}.json`, updatedMessage);

      const updatedMessages = messages.map(item => {
        if (item.id === message.id) {
          return {
            ...item,
            likes: updatedMessage.likes,
          };
        }

        return item;
      });

      setMessages(updatedMessages);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      {
        messages.map(message => (
          <div key={message.id} className={styles.messageCard}>
            <h5>Author:{message.author}</h5>
            <p>{message.message}</p>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Button variant="outlined" onClick={() => void likeMessage(message)}>
                Like
              </Button>
              <span>{message.likes || 0}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}