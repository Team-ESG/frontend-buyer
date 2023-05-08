import { atom } from 'recoil';

export interface User {
  id: string;
  nickname: string;
  address: {
    firstAddress: string;
    secondAddress: string;
    thirdAddress: string;
  };
  accessToken: string;
  refreshToken: string;
  discountPrice: number;
  sex: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
