import { FC } from 'react';

import { ICard } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';

import styles from './MoviesCardList.module.css';

interface MoviesCardListProps {
  cards: ICard[];
  cbBtnClick: () => void;
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
