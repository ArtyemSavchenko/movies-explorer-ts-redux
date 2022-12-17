export interface IUser {
  email: string;
  name: string;
}

export interface ICurrentUser extends IUser {
  _id: string;
}

export interface IRegisterData extends IUser {
  password: string;
}

export interface IAuthorizeData {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}
