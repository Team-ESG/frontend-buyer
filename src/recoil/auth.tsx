import { atom } from 'recoil';

type Address = {
  firstAddr: string;
  secondAddr: string;
  thirdAddr: string;
};

export interface User {
  address: Address;
  birthDate: string;
  discountPrice: number;
  id: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  sex: string;
  social: boolean;
  wishList: object[];
  accessToken: string;
  refreshToken: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
