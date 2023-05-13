import { useAppSelector } from '../../../../hooks/redux';
import sendButton from './sendButton.svg';
import checkButton from './check.svg';

type AppProps = {
  sendMessage: () => void;
};

export const SendButton = ({ sendMessage }: AppProps) => {
  const { isMessageEdit } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  return (
    <div className="chat-form__send-button" onClick={sendMessage}>
      <img src={isMessageEdit ? checkButton : sendButton} alt="send button" />
    </div>
  );
};
