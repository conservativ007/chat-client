import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IUser } from '../../../models/IUser';
import { socket } from '../../../socket';
import { userSlice } from '../../../store/reducers/UserSlice';

export const UserAvatars = () => {
  const { myself } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const baseAvatars = [
    'https://i.ibb.co/CmgsjFz/f10ef7f35689.png',
    'https://i.ibb.co/pzMk1pf/2253542a88b4.png',
    'https://i.ibb.co/3Rg7PBj/e2eb0bbfb561.png',
    'https://i.ibb.co/6YKdpwr/e44a9833c974.png',
    'https://i.ibb.co/dQDBBLn/c3a22392992b.png',
  ];

  const changeUserAvatar = (srcAvatar: string) => {
    socket.emit(
      'setUserAvatar',
      { userId: myself.id, avatar: srcAvatar },
      (response: IUser) => {
        dispatch(setUser(response));
      }
    );
  };

  return (
    <div className="user-avatar__avatars">
      <p className="user-avatar__description">choice your avatar</p>
      <div>
        {baseAvatars.map((avatarSrc: string, index: number) => {
          return (
            <img
              onClick={() => changeUserAvatar(avatarSrc)}
              key={index}
              src={avatarSrc}
              alt="user-avatar"
            />
          );
        })}
      </div>
    </div>
  );
};
