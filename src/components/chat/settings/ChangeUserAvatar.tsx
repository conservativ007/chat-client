import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { socket } from '../../../socket';
import { IUser } from '../../../models/IUser';
import { userSlice } from '../../../store/reducers/UserSlice';
import axios from 'axios';

import './changeUserAvatar.scss';
import user from '../../../assets/images/avatars/user.png';
import { CONSTANTS } from '../../../constants/constants';

export const ChangeUserAvatar = () => {
  const [file, setFile] = useState<File>();
  const [isFileChousen, setIsFileChousen] = useState<boolean>(false);
  const { myself, token } = useAppSelector((state) => state.userReducer);

  const imgRef = useRef<HTMLImageElement>(null);

  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  useEffect(() => {
    // console.log(isFileChousen);

    if (file !== undefined) {
      setIsFileChousen(true);
    }

    if (file === undefined) {
      setIsFileChousen(false);
    }
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const changeUserAvatar = (srcAvatar: string) => {
    socket.emit(
      'setUserAvatar',
      { userId: myself.id, avatar: srcAvatar },
      (response: IUser) => {
        dispatch(setUser(response));
      }
    );
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post(`${CONSTANTS.CHANGE_USER_AVATAR}/${myself.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        changeUserAvatar(response.data.imageUrl);
      })
      .catch((err) => console.error(err));

    if (imgRef.current === null) return;
    const elem = imgRef.current;
    elem.className = 'animation';

    setTimeout(getToPreviousState, 500);
  };

  const getToPreviousState = () => {
    const elem = imgRef.current;

    if (elem === null) return;

    elem.className = '';
    setFile(undefined);
  };

  if (isFileChousen === true) {
    return (
      <div className="file-animation">
        <div className="file-animation__animation">
          <img ref={imgRef} src={user} alt="user" />
        </div>
        <div
          onClick={handleUploadClick}
          className="file-animation__button field__file-button"
        >
          upload
        </div>
      </div>
    );
  }

  return (
    <div className="field__wrapper">
      <input
        name="file"
        type="file"
        id="field__file-2"
        className="field field__file"
        onChange={handleFileChange}
      />
      <label className="field__file-wrapper" htmlFor="field__file-2">
        <div className="field__file-fake">select avatar</div>
        <div className="field__file-button">select</div>
      </label>
    </div>
  );
};
