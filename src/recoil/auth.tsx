import { atom } from 'recoil';

export interface User {
  id: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
