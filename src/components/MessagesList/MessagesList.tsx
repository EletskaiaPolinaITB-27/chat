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

  },[])

  return (
    <div className={styles.container}>
      {
        messages.map(message => (
          <div key={message.id} className={styles.messageCard}>
            <h5>Author:{message.author}</h5>
            <p>{message.message}</p>

          </div>
        ))
      }
    </div>
  )
}