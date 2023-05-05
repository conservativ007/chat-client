import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Chat } from './components/chat/Chat';

import './style/chat.scss';
import { RegistrationSelect } from './components/registrationForm/RegistrationSelect';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Settings } from './components/chat/settings/Settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationSelect />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
