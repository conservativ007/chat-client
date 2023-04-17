import { Button, Form, InputGroup } from 'react-bootstrap';
import { socket } from '../../socket';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

export const ChatForm = () => {
  const [message, setMessage] = useState('');
  const { name } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  const setCorrectMessage = () => {
    const arrText = message.split('');
    return arrText
      .map((letter, index) => {
        if (index > 1 && index % 10 === 0) {
          return `${letter}\n`;
        }
        return letter;
      })
      .join('');
  };

  const sendMessage = () => {
    let textCorrected = setCorrectMessage();

    let message = {
      message: textCorrected,
      senderName: name,
      receiverName: userForPrivateMessage.login,
    };

    if (userForPrivateMessage.login === 'all') {
      socket.emit('createMessageForAllChat', message);
    } else {
      socket.emit('createPrivateMessage', message);
    }
    setMessage('');
  };

  return (
    <div className="chat-form">
      <InputGroup>
        <Form.Control
          placeholder="Your message..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={sendMessage}
          variant="outline-secondary"
          id="button-addon2"
        >
          {userForPrivateMessage.login === 'all' ? 'send all' : 'private'}
        </Button>
      </InputGroup>
    </div>
  );
};
