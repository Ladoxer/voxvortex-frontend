export interface IUser extends Document {
  name: string;
  email: string;
  mobile: number;
  password: string;
  is_verified: boolean;
  is_premium: boolean;
  is_admin: boolean;
  is_blocked: boolean;
  otp: string;
  following: Array<string>;
  followers: Array<string>;
  blogs: Array<string>;
  saved: Array<string>;
  liked: Array<string>;
  token: string;
  customerId: string;
}