import { Button, Form, InputGroup } from 'react-bootstrap';
import { socket } from '../../socket';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

export const ChatForm = () => {
  const [text, setText] = useState('');

  const { name } = useAppSelector((state) => state.userReducer);

  const sendMessage = () => {
    const arrText = text.split('');

    let textCorrected = arrText
      .map((letter, index) => {
        if (index > 1 && index % 10 === 0) {
          return `${letter}\n`;
        }
        return letter;
      })
      .join('');

    let message = {
      login: name,
      text: textCorrected,
    };

    socket.emit('createMessage', message, () => {});
    setText('');
  };

  return (
    <div className="chat-form">
      <InputGroup>
        <Form.Control
          placeholder="Your message..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          onClick={sendMessage}
          variant="outline-secondary"
          id="button-addon2"
        >
          Send
        </Button>
      </InputGroup>
    </div>
  );
};
