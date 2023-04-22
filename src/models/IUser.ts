export interface IUser {
  id: string;
  login: string;
  socketID: string;
  online: boolean;
  hashedRt: string | null;
  password: null;
  messageForWho: string[];
  targetForMessage: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  lastMessage: string;
}

export const defaultUser: IUser = {
  id: '',
  login: 'all',
  online: false,
  socketID: '',
  createdAt: '',
  hashedRt: '',
  password: null,
  targetForMessage: 'all',
  updatedAt: '',
  version: 0,
  messageForWho: [],
  lastMessage: '',
};
