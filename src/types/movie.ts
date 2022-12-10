// for like
export interface IMovie {
  country: string;
  description: string;
  director: string;
  duration: number;
  image: string;
  movieId: number;
  nameEN: string;
  nameRU: string;
  thumbnail: string;
  trailerLink: string;
  year: string;
}

// liked cards
export interface ICard extends IMovie {
  _id: string;
  owner: string;
}
