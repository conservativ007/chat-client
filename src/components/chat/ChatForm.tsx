import { Button, Form, InputGroup } from 'react-bootstrap';
import { socket } from '../../socket';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

export const ChatForm = () => {
  const [text, setText] = useState('');

  const { name } = useAppSelector((state) => state.userReducer);

  const sendMessage = () => {
    let message = {
      login: name,
      text: text,
    };

    socket.emit('createMessage', message, () => {});
    setText('');
  };

  return (
    <div className="chat-form">
      <InputGroup className="mb-3">
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
