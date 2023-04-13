export interface IUser {
  id: string;
  login: string;
  socketID: string;
  online: boolean;
  hashedRt: string | null;
  password: null;
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
  updatedAt: '',
  version: 0,
};
