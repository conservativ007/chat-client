import { useAppSelector } from '../hooks/redux';

export const useLastMessagesFromUsers = () => {
  const { allUsers } = useAppSelector((state) => state.userReducer);

  const serializedUsers = allUsers.map((user) => {
    return {
      userLogin: user.login,
    };
  });

  // console.log(serializedUsers);
};
