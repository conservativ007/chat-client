import { Messages } from './Messages';
import { ChatForm } from './ChatForm';
import { Users } from './Users';
import { Header } from './Header';

export const Chat = () => {
  return (
    <div className="chat-container">
      <Header />
      <div className="chat-body">
        <Users />
        <Messages />
      </div>
      <ChatForm />
    </div>
  );
};
