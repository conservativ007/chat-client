import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Chat } from './components/chat/Chat';

import './style/chat.scss';
import { RegistrationForm } from './components/registrationForm/RegistrationForm';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Settings } from './components/chat/settings/Settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
