import React from 'react';

import { Chat } from './components/chat/chatForm/Chat';

import './assets/fonts/B612/B612-Regular.ttf';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Settings } from './components/chat/settings/Settings';
import { SignupOrLogin } from './components/registrationForm/SignupOrLogin';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupOrLogin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" theme="light" />
    </div>
  );
}

export default App;
