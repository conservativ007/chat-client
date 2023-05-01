import { Messages } from './Messages';
import { Users } from './users/Users';
import { Header } from './header/Header';

export const Chat = (): JSX.Element => {
  return (
    <div className="chat-container">
      <Header />
      <div className="chat-body">
        <div className="divider"></div>
        <Users />
        <Messages />
      </div>
    </div>
  );
};
