import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { divInputRef } from '../ChatForm';

type AppProps = {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Emoji = ({ setMessage }: AppProps) => {
  const addEmojiToInput = (e: any) => {
    let divElem = divInputRef.current;
    if (divElem === null) return;

    setMessage((prev: string | null) => (prev += e.emoji));
    divElem.innerHTML += e.emoji;
  };

  return (
    <div className="custom-emoji">
      <EmojiPicker
        lazyLoadEmojis={true}
        emojiStyle={EmojiStyle.NATIVE}
        onEmojiClick={addEmojiToInput}
        emojiVersion="0.6"
      />
    </div>
  );
};
