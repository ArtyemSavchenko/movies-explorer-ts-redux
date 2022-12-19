import { FC, memo } from 'react';

import { IMovie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';

import styles from './MoviesCardList.module.css';

interface MoviesCardListProps {
  cards: IMovie[] | null;
}

const MoviesCardList: FC<MoviesCardListProps> = ({ cards }) => {
  return (
    <ul className={styles.moviesCardList}>
      {cards?.map((card) => (
        <li key={card.movieId}>
          <MovieCard card={card} />
        </li>
      ))}
    </ul>
  );
};

export default memo(MoviesCardList);
