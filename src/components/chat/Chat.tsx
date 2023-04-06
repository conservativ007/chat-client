import { Messages } from './Messages';
import { ChatForm } from './ChatForm';
import { Users } from './Users';

export const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-body">
        <Users />
        <Messages />
      </div>
      <ChatForm />
    </div>
  );
};
