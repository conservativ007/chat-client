import React from 'react';
import './style/App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Chat } from './components/chat/Chat';

import './style/chat.css';
import { RegistrationForm } from './components/registrationForm/RegistrationForm';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
