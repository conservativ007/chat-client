import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { sizeOfElementsSlice } from '../../../../store/reducers/SizeOfElements';
import { showMessgaesOrUsersSlice } from '../../../../store/reducers/ShowMessgaesOrUsersSlice';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';
import { userSlice } from '../../../../store/reducers/UserSlice';
import { userAfterLogin } from '../../../../models/IUser';

export const useChat = (ref: any) => {
  const rootDocumentRef = useRef<HTMLElement>(document.documentElement);

  const { sizeOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { showMessages } = useAppSelector(
    (state) => state.showMessgaesOrUsersReducer
  );

  const dispatch = useAppDispatch();
  const { setSizeOfChatBody, setSizeHeightOfChatBody } =
    sizeOfElementsSlice.actions;
  const { setShowMessages } = showMessgaesOrUsersSlice.actions;
  const { setPrivateMessages } = privateMessageSlice.actions;
  const { setPrivateUser } = userSlice.actions;

  const changeClassToChatBodyContainer = (reset: boolean) => {
    let elemOfChatContainerRef: HTMLDivElement = ref.current;
    if (elemOfChatContainerRef === null) return;

    let elemOfChatBodyContainer = elemOfChatContainerRef.querySelector(
      '.chat-body__container'
    );

    if (reset === false) {
      const classShowUsers = 'animation-show-users';
      const classShowMessages = 'animation-show-messages';

      if (showMessages === true) {
        elemOfChatBodyContainer?.classList.remove(classShowUsers);
        elemOfChatBodyContainer?.classList.add(classShowMessages);
      }

      if (showMessages === false) {
        elemOfChatBodyContainer?.classList.add(classShowUsers);
        elemOfChatBodyContainer?.classList.remove(classShowMessages);
      }
      return;
    }

    if (elemOfChatBodyContainer === null) return;
    elemOfChatBodyContainer.className = 'chat-body__container';
  };

  // here we setting global variable for scss
  useEffect(() => {
    const rootElementOfDocument = rootDocumentRef.current;
    rootElementOfDocument?.style.setProperty(
      '--size-chat-body',
      `${sizeOfChatBody}px`
    );
    rootElementOfDocument?.style.setProperty(
      '--user-select',
      `${sizeOfChatBody <= 600 ? 'none' : 'auto'}`
    );
  }, [sizeOfChatBody]);

  useEffect(() => {
    if (sizeOfChatBody <= 600) {
      dispatch(setShowMessages(false));
      dispatch(setPrivateUser(userAfterLogin));
      dispatch(setPrivateMessages([]));
    }
  }, [sizeOfChatBody]);

  useEffect(() => {
    const handleResize = () => {
      let elemOfDivRef: HTMLElement = ref.current;
      let withOfElem = elemOfDivRef?.getBoundingClientRect().width;
      let heightOfElem = elemOfDivRef?.getBoundingClientRect().height;

      if (withOfElem === undefined) return;
      dispatch(setSizeOfChatBody(withOfElem));
      dispatch(setSizeHeightOfChatBody(heightOfElem));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // if not mobile return
    if (sizeOfChatBody <= 600) {
      changeClassToChatBodyContainer(false);
    }

    if (sizeOfChatBody > 600) {
      changeClassToChatBodyContainer(true);
    }
  }, [showMessages, sizeOfChatBody]);
};
