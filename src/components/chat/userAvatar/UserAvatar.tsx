import './userAvatar.scss';

type AppProps = {
  srcAvatar: string;
};

export const UserAvatar = ({ srcAvatar }: AppProps) => {
  return (
    <div className="user-avatar">
      <img src={srcAvatar} alt="avatar" />
    </div>
  );
};
