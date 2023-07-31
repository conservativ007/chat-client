import { useAppSelector } from '../../../../hooks/redux';
import { useToast } from '../../../../hooks/useToast';
import { svgCopy } from '../index';

export const CopyMessage = () => {
  const getToast = useToast;

  const { editMessage } = useAppSelector(
    (state) => state.privateMessageReducer
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editMessage.message);
      getToast(true, 'Copied!');
    } catch (e) {
      getToast(false, `something went wrong`);
    }
  };

  if (editMessage.message.length > 0) {
    return (
      <div onClick={handleCopy} className="message-settings__copy">
        <img src={svgCopy} alt="" />
        <p>copy</p>
      </div>
    );
  }

  return <p></p>;
};
