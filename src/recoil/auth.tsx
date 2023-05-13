import { atom } from 'recoil';

export interface User {
  id: string;
  nickname: string;
  address: {
    firstAddr: string;
    secondAddr: string;
    thirdAddr: string;
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
