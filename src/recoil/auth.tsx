import { atom } from 'recoil';

export interface User {
  id: string;
  nickname: string;
  address: string;
  accessToken: string;
  refreshToken: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
