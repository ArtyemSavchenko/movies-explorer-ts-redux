import { IMovie } from '../types/movie';
import { SHORT_MOVIE_DURATION } from './constants';

export const filterBySearchString = (movies: IMovie[], searchString: string) => {
  if (!searchString) {
    return movies;
  }

  return movies.filter((movie) => {
    if (
      !movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) &&
      !movie.nameEN.toLowerCase().includes(searchString.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
};

export const filterByDuration = (movies: IMovie[], isShortMovies: boolean) => {
  return movies.filter((movie) => {
    if (
      !(isShortMovies && movie.duration <= SHORT_MOVIE_DURATION) &&
      !(!isShortMovies && movie.duration > SHORT_MOVIE_DURATION)
    ) {
      return false;
    }

    return true;
  });
};

export const getNewPage = (renderedCards: IMovie[], allCards: IMovie[]) => {
  if (!renderedCards) {
    renderedCards = [];
  }

  const docWidth = window.innerWidth;
  const lineWidth = docWidth >= 1280 ? 3 : 2;

  let newCards;

  if (renderedCards.length === 0) {
    const neededCards = docWidth >= 1280 ? 12 : docWidth >= 768 ? 8 : 5;
    newCards = allCards.slice(0, neededCards);
  } else {
    const emptyCells =
      docWidth < 768
        ? 0
        : (lineWidth - (renderedCards.length % lineWidth)) % lineWidth;

    newCards = allCards.slice(
      renderedCards.length,
      renderedCards.length + emptyCells + lineWidth
    );
  }

  const isAllCards =
    renderedCards.length + newCards.length >= allCards.length ? true : false;

  return { newCards, isAllCards };
};
