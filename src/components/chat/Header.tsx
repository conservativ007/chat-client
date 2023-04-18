import '../../style/header.css';
import { useAppSelector } from '../../hooks/redux';

export const Header = (): JSX.Element => {
  const { name } = useAppSelector((state) => state.userReducer);
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  return (
    <header>
      <h2>{name}</h2>
      <span> ---- </span>
      <h3>
        {userForPrivateMessage.login ? userForPrivateMessage.login : 'not'}
      </h3>
    </header>
  );
};
