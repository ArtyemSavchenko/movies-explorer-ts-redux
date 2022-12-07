export interface IUser {
  email: string;
  name: string;
}

export interface ICurrentUser extends IUser {
  _id: string;
}

export interface IToken {
  token: string;
}
