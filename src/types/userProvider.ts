//TODO delete this file after redux
import { IMovie } from "./movie";
import { ICurrentUser } from "./user";

export type ISignIn = (user: ICurrentUser, callback?: () => void) => void;
export type ISignOut = (callback?: () => void) => void;

export interface IUserProvider {
    user: ICurrentUser | null;
    signIn: ISignIn;
    signOut: ISignOut;
    likedCards: IMovie[];
    setLikedCards: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

