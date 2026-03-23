export interface PayloadLogin {
  account: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  refreshToken: string;
  user: {
    userId: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    deviceToken?: string;
    name: string;
    avartar?: string;
    status: number;
  };
}
