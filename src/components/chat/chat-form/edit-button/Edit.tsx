import { useRef } from 'react';
import sditSvgForEditContainer from './editTwo.svg';
import { useAppSelector } from '../../../../hooks/redux';

type AppProps = {
  inputWidth: number;
};

export let divEditRef: any;

export const Edit = ({ inputWidth }: AppProps) => {
  divEditRef = useRef<HTMLDivElement | null>(null);

  const { heightOfEditableElem } = useAppSelector(
    (state) => state.messaggeMenuReducer
  );

  return (
    <div
      style={{
        width: `${inputWidth - 70}px`,
        top: `-${heightOfEditableElem}px`,
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
