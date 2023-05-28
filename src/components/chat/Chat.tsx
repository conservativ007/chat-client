import { Messages } from './messages/Messages';
import { Users } from './users/Users';
import { Header } from './header/Header';
import { MessageMenu } from './message-menu/MessageMenu';

export const Chat = (): JSX.Element => {
  return (
    <div className="chat-container">
      <Header />
      <div className="chat-body">
        <Users />
        <Messages />
        <MessageMenu />
      </div>
    </div>
  );
};
