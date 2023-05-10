import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../models/IMessage';
import { ILike } from '../../models/ILike';

interface PrivateMessageState {
  privateMessages: IMessage[];
}

const initialState: PrivateMessageState = {
  privateMessages: [],
};

export const privateMessageSlice = createSlice({
  name: 'privateMessage',
  initialState,
  reducers: {
    setPrivateMessages(state, action: PayloadAction<IMessage[]>) {
      state.privateMessages = action.payload;
    },
    setPrivateMessage(state, action: PayloadAction<IMessage>) {
      state.privateMessages.push(action.payload);
    },
    setLikeForPrivateMessageForReciever(state, action: PayloadAction<ILike>) {
      const { messageId, senderName } = action.payload;

      state.privateMessages.map((message) => {
        if (message.id === messageId) {
          return setLikeToMessage(message, senderName);
        }
        return message;
      });
    },
    updateMessage(state, action: PayloadAction<IMessage>) {
      const recievedMessage: IMessage = action.payload;
      // state.privateMessages.map((message) => {
      //   if (message.id === action.payload.id) {
      //     console.log('the message found');
      //     console.log(message);
      //     console.log(action.payload);
      //     return action.payload;
      //   }
      //   return message;
      // });
      let foundIndexMessage = state.privateMessages.findIndex(
        (message) => message.id === recievedMessage.id
      );

      if (foundIndexMessage === -1) {
        console.log('foundIndexMessage === -1');
        return;
      }

      state.privateMessages.splice(foundIndexMessage, 1, recievedMessage);
    },
  },
});

const setLikeToMessage = (message: IMessage, senderName: string) => {
  const isUserAlreadyLikedThisMessage = message.whoLiked.findIndex(
    (userName) => userName === senderName
  );

  if (isUserAlreadyLikedThisMessage === -1) {
    message.likeCount = message.likeCount += 1;
    message.whoLiked.push(senderName);
  } else {
    message.likeCount = message.likeCount -= 1;
    message.whoLiked.splice(isUserAlreadyLikedThisMessage, 1);
  }

  return message;
};

export default privateMessageSlice.reducer;
