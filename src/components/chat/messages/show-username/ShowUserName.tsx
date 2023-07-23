import { useAppSelector } from '../../../../hooks/redux';

interface IShowUserName {
  username: string;
}

export const ShowUserName = ({ username }: IShowUserName) => {
  const { userForPrivateMessage } = useAppSelector(
    (state) => state.userReducer
  );

  if (userForPrivateMessage.login === 'all') {
    return (
      <span className="message-user" style={{ marginRight: '5px' }}>
        {username}:
      </span>
    );
  }
  return <div></div>;
};
