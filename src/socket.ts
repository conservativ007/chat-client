import { io } from 'socket.io-client';
import { IP, PORT } from './constants/constants';

const URL = `${IP}:${PORT}`;

export const socket = io(URL, {
  autoConnect: false,
});
