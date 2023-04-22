import { Messages } from './Messages';
import { Users } from './Users';
import { Header } from './Header';

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
