import { useEffect, useState } from 'react';
import { refOfUsers } from '../../components/chat/users/Users';

export const useSizeOfUsersContainer = () => {
  const [sizeOfUsersContainer, setSizeOfUsersContainer] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      let widthOfUsers: HTMLDivElement = refOfUsers.current;
      let widthElemOfUsers = widthOfUsers.getBoundingClientRect().width;
      setSizeOfUsersContainer(widthElemOfUsers);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return sizeOfUsersContainer;
};
