import { FC } from 'react';

import { IMovie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';

import styles from './MoviesCardList.module.css';

interface MoviesCardListProps {
  cards: IMovie[];
  cbBtnClick: (card: IMovie) => void;
}

const MoviesCardList: FC<MoviesCardListProps> = ({ cards, cbBtnClick }) => {
  return (
    <ul className={styles.moviesCardList}>
      {cards.map((card) => (
        <li key={card.movieId}>
          <MovieCard card={card} cbBtnClick={cbBtnClick} />
        </li>
      ))}
    </ul>
  );
};

export default MoviesCardList;
