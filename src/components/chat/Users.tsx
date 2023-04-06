import { useEffect, useState } from 'react';
import { socket } from '../../socket';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // first emit all users
    socket.emit('getAllUsers');

    // four resieved all users in the function
    const getAllUsers = (users: any) => {
      console.log(users);
      setUsers(users);
    };

    // second see on the server side
    // third resieved all users
    socket.on('getAllUsers', getAllUsers);

    return () => {
      socket.off('getAllUsers', getAllUsers);
    };
  }, []);

  return (
    <div className="users">
      {users.map((user: any, index) => {
        return <div key={index}>{user.login}</div>;
      })}
    </div>
  );
};
