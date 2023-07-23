import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IMessage } from '../../../../models/IMessage';
import { messageMenuSlice } from '../../../../store/reducers/MessaggeMenu';
import { privateMessageSlice } from '../../../../store/reducers/PrivateMessageSlice';

export const useHandleContextMenu = () => {
  const dispatch = useAppDispatch();

  const { setMessageWichEdit } = privateMessageSlice.actions;

  const { setShowMessageMenu, setLeft, setTop, setHeightOfEditableElem } =
    messageMenuSlice.actions;

  const { sizeOfChatBody, sizeHeightOfChatBody } = useAppSelector(
    (state) => state.changeSizeOfElementsReducer
  );

  const { myself } = useAppSelector((state) => state.userReducer);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    message: IMessage
  ) => {
    e.preventDefault();
    let elemOfClickedMouse = e.currentTarget;

    let topOfElem = Math.round(elemOfClickedMouse.getBoundingClientRect().top);
    let leftOfElem = Math.round(
      elemOfClickedMouse.getBoundingClientRect().left
    );
    let widthOfElem = Math.round(
      elemOfClickedMouse.getBoundingClientRect().width
    );
    let heightOfElemm = Math.round(
      elemOfClickedMouse.getBoundingClientRect().height
    );

    const testHeight = sizeHeightOfChatBody - topOfElem;
    let correctTop =
      testHeight < 400 ? topOfElem - 120 - heightOfElemm : topOfElem;

    if (message.senderId !== myself.id) return;

    dispatch(setMessageWichEdit(message));
    dispatch(setHeightOfEditableElem(heightOfElemm < 65 ? 65 : heightOfElemm));

    // show menu in message
    dispatch(setShowMessageMenu(true));

    dispatch(setTop(correctTop + heightOfElemm));

    // if the mobile layout
    if (sizeOfChatBody <= 600) {
      dispatch(setLeft(sizeOfChatBody + (leftOfElem - 50)));
    }
    // if the desktop layout
    if (sizeOfChatBody > 600) {
      dispatch(setLeft(leftOfElem - 50));
    }
  };

  return handleContextMenu;
};
