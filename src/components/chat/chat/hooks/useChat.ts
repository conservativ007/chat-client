import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { sizeOfElementsSlice } from '../../../../store/reducers/SizeOfElements';

export const useChat = (ref: any) => {
  const rootDocumentRef = useRef<HTMLElement>(document.documentElement);

  const { sizeOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { showMessages } = useAppSelector(
    (state) => state.showMessgaesOrUsersReducer
  );

  const dispatch = useAppDispatch();
  const { setSizeOfChatBody } = sizeOfElementsSlice.actions;

  // here we setting global variable for scss
  useEffect(() => {
    const rootElementOfDocument = rootDocumentRef.current;
    rootElementOfDocument?.style.setProperty(
      '--size-chat-body',
      `${sizeOfChatBody}px`
    );
  }, [sizeOfChatBody]);

  useEffect(() => {
    const handleResize = () => {
      let elemOfDivRef = ref.current;
      let withOfElem = elemOfDivRef?.getBoundingClientRect().width;

      if (withOfElem === undefined) return;
      dispatch(setSizeOfChatBody(withOfElem));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const classShowUsers = 'animation-show-users';
    const classShowMessages = 'animation-show-messages';

    let elemOfChatContainerRef = ref.current;
    if (elemOfChatContainerRef === null) return;

    let elemOfChatBodyContainer = elemOfChatContainerRef.querySelector(
      '.chat-body__container'
    );

    if (showMessages === true) {
      elemOfChatBodyContainer?.classList.remove(classShowUsers);
      elemOfChatBodyContainer?.classList.add(classShowMessages);
      console.log(elemOfChatBodyContainer);
    }

    if (showMessages === false) {
      elemOfChatBodyContainer?.classList.add(classShowUsers);
      elemOfChatBodyContainer?.classList.remove(classShowMessages);
    }
  }, [showMessages]);
};
