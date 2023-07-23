import { Chat } from './components/chat/chat/Chat';

import './assets/fonts/B612/B612-Regular.ttf';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Settings } from './components/chat/settings/Settings';
import { SignupOrLogin } from './components/registrationForm/SignupOrLogin';
import { ToastContainer } from 'react-toastify';
import { FileProvider } from './components/context/FileContext';

function App() {
  return (
    <FileProvider>
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
    </FileProvider>
  );
}

export default App;
