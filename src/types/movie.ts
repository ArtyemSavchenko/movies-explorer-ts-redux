export interface IMovie {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  owner: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
}

export interface IMovieForLike extends IMovie {
  owner: string;
}

export interface ILikedMovie  extends IMovieForLike {
  owner: string;
}
