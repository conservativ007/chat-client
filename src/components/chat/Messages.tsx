import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import '../../style/messages.scss';
import { ShowMessages } from './ShowMessages';
import { useMessage } from '../../hooks/useMessage';

import { sizeOfElementsSlice } from '../../store/reducers/SizeOfElements';

export const Messages = (): JSX.Element => {
  const { privateMessages } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const dispatch = useAppDispatch();
  const { setSizeInputText, setMarginOfMessageContainer } =
    sizeOfElementsSlice.actions;

  // let listRef = useRef<HTMLDivElement | null>(null);
  let containerRef = useRef<HTMLDivElement | null>(null);

  useMessage();

  useEffect(() => {
    containerRef.current?.lastElementChild?.scrollIntoView();
    // listRef.current?.lastElementChild?.scrollIntoView();

    // console.log(listRef.current?.lastElementChild);
  }, [privateMessages]);

  useEffect(() => {
    let messageContainer = containerRef.current;
    // console.log(messageContainer?.getBoundingClientRect());

    const handleResize = () => {
      const widthOfInputText = String(
        messageContainer?.getBoundingClientRect().width
      );
      const marginOfMessageContainer = String(
        messageContainer?.getBoundingClientRect().x
      );

      let x = Number(widthOfInputText) - 5;

      dispatch(setSizeInputText(String(x)));

      dispatch(setMarginOfMessageContainer(marginOfMessageContainer));
      if (Number(marginOfMessageContainer) > 560) {
        dispatch(setMarginOfMessageContainer('560'));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="chat-messages">
      <div className="messages-container" ref={containerRef}>
        <ShowMessages />
      </div>
    </div>
  );
};
