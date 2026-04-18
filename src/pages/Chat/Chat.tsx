import { ChatForm } from '../../components/ChatForm/ChatForm.jsx';
import {MessagesList} from '../../components/MessagesList/MessagesList.tsx';

export const Chat = () => {
  return (
    <div>
     <MessagesList/>
     <ChatForm/>
    </div>
  )
}