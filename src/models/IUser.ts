export interface IUser {
  id: string;
  login: string;
  socketID: string;
  online: boolean;
  hashedRt: string | null;
  password: null;
  // hasUnreadMessage: boolean;
  // messageFromWho: string[];
  messageForWho: string[];
  targetForMessage: string;
  createdAt: string;
  updatedAt: string;
  version: number;
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
  // hasUnreadMessage: false,
  updatedAt: '',
  version: 0,
  messageForWho: [],
};
