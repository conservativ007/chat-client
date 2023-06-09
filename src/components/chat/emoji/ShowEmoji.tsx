import { useState } from 'react';
import { privateMessageSlice } from '../../../store/reducers/PrivateMessageSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

export const ShowEmoji = () => {
  const [fill, setFill] = useState('#95afc0');

  const { setIsEmojiShow } = privateMessageSlice.actions;
  const { isEmojiShow } = useAppSelector(
    (state) => state.privateMessageReducer
  );
  const dispatch = useAppDispatch();

  const changeEmojiVisible = () => {
    dispatch(setIsEmojiShow(isEmojiShow === true ? false : true));
  };

  return (
    <div
      onMouseOut={() => setFill('#95afc0')}
      onMouseOver={() => setFill('#686de0')}
      className="chat-form__emoji"
    >
      <svg
        onClick={changeEmojiVisible}
        fill={fill}
        height="30px"
        width="30px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330.00 330.00"
        xmlSpace="preserve"
        stroke="#4834d4"
        strokeWidth="0.0033"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {' '}
          <g id="XMLID_92_">
            {' '}
            <path
              id="XMLID_93_"
              d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300 c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z"
            />{' '}
            <path
              id="XMLID_104_"
              d="M205.306,205.305c-22.226,22.224-58.386,22.225-80.611,0.001c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213c16.963,16.963,39.236,25.441,61.519,25.441c22.276,0,44.56-8.482,61.519-25.441 c5.858-5.857,5.858-15.355,0-21.213C220.661,199.447,211.163,199.448,205.306,205.305z"
            />{' '}
            <path
              id="XMLID_105_"
              d="M115.14,147.14c3.73-3.72,5.86-8.88,5.86-14.14c0-5.26-2.13-10.42-5.86-14.14 c-3.72-3.72-8.88-5.86-14.14-5.86c-5.271,0-10.42,2.14-14.141,5.86C83.13,122.58,81,127.74,81,133c0,5.26,2.13,10.42,5.859,14.14 C90.58,150.87,95.74,153,101,153S111.42,150.87,115.14,147.14z"
            />{' '}
            <path
              id="XMLID_106_"
              d="M229,113c-5.26,0-10.42,2.14-14.141,5.86C211.14,122.58,209,127.73,209,133c0,5.27,2.14,10.42,5.859,14.14 C218.58,150.87,223.74,153,229,153s10.42-2.13,14.14-5.86c3.72-3.72,5.86-8.87,5.86-14.14c0-5.26-2.141-10.42-5.86-14.14 C239.42,115.14,234.26,113,229,113z"
            />{' '}
          </g>{' '}
        </g>
      </svg>
    </div>
  );
};
