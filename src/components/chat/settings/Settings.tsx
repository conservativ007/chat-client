import './settings.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserDetails } from './UserDetails';

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings">
      <ToastContainer position="top-center" theme="light" />
      <header>
        <h1>settings</h1>
        <h2 onClick={() => navigate('/chat')}>back</h2>
      </header>
      <UserDetails />
    </div>
  );
};
