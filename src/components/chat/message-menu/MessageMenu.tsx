import './message-menu.scss';

import { useDelete, useEdit } from './index';
import { useAppSelector } from '../../../hooks/redux';

import { CopyMessage } from './components/CopyMessage';
import { EditMessage } from './components/EditMessage';
import { DeleteMessage } from './components/DeleteMessage';

export const MessageMenu = () => {
  const { showMessageMenu, left, top } = useAppSelector(
    (state) => state.messaggeMenuReducer
  );

  const styles = {
    display: `${showMessageMenu === true ? 'flex' : 'none'}`,
    left: left,
    top: top - 50, // - header
  };

  useEdit();
  useDelete();

  return (
    <div className="message-settings" style={styles}>
      <CopyMessage />
      <EditMessage />
      <DeleteMessage />
    </div>
  );
};
