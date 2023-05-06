import './settings.scss';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from './UserDetails';

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings">
      <header>
        <p>settings</p>
        <p onClick={() => navigate('/chat')}>back</p>
      </header>
      <UserDetails />
    </div>
  );
};
