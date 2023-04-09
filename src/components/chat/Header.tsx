import { useSelector } from 'react-redux';
import '../../style/header.css';
import { useAppSelector } from '../../hooks/redux';

export const Header = () => {
  const { name } = useAppSelector((state) => state.userReducer);

  return (
    <header>
      <h2>{name}</h2>
    </header>
  );
};
