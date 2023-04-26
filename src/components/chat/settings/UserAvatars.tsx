import { useAvatars } from '../../../hooks/useAvatars';

type AppProps = {
  changeAvatar: any;
};

export const UserAvatars = ({ changeAvatar }: AppProps) => {
  const avatars = useAvatars();
  return (
    <>
      {Object.values(avatars).map((value: string, index: number) => {
        return (
          <img
            onClick={() => changeAvatar(value)}
            key={index}
            src={value}
            alt="user-avatar"
          />
        );
      })}
    </>
  );
};
