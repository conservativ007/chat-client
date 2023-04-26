import { useEffect, useState } from 'react';

type AppProps = {
  name: string;
  avatar: string;
};

export const UserAvatar = ({ name, avatar }: AppProps) => {
  const [srcAvatar, setSrcAvatar] = useState();

  useEffect(() => {
    import(`../../../assets/avatars/${avatar}.png`).then((image) => {
      const src = image.default;
      setSrcAvatar(src);
    });
  }, []);

  return (
    <div className="user-avatar">
      <img
        style={{ width: '50px', height: '50px' }}
        src={srcAvatar}
        alt="avatar"
      />
    </div>
  );
};
