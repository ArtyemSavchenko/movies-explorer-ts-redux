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
  owner?: string;
  _id?: string;
}

export interface IBeatMovie {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: {
    url: string;
    formats: {
      thumbnail: { url: string };
    };
  };
  trailerLink: string;
  id: number;
  nameRU: string;
  nameEN: string;
}
