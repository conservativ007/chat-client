import { useRef } from 'react';
import sditSvgForEditContainer from './editTwo.svg';
// import { divEditRef } from './ChatForm';

type AppProps = {
  inputWidth: number;
};

export let divEditRef: any;

export const Edit = ({ inputWidth }: AppProps) => {
  divEditRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      style={{
        width: `${inputWidth - 70}px`,
      }}
      className="chat-form__edit-container"
      ref={divEditRef}
    >
      <div className="edit-describe">Editing</div>
      <div className="edit-text"></div>
      <div className="edit-divider"></div>
      <div className="edit-image">
        <img src={sditSvgForEditContainer} alt="" />
      </div>
    </div>
  );
};
