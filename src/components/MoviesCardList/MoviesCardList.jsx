import MovieCard from '../MovieCard/MovieCard';

import './MoviesCardList.css';

const MoviesCardList = ({ cards, cbBtnClick }) => {

  return (
    <ul className="movies-card-list">
      {cards.map((card) => (
        <li key={card.id || card.movieId}>
          <MovieCard
            card={card}
            cbBtnClick={cbBtnClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default MoviesCardList;
