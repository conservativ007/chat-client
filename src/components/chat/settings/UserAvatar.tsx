import { useAppSelector } from '../../../hooks/redux';

export const UserAvatar = () => {
  const { myself } = useAppSelector((state) => state.userReducer);

  return (
    <div className="user-avatar__avatar">
      <img src={myself.avatar} alt="user-avatar" />
    </div>
  );
};
