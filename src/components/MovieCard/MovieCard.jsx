import { useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LikeBtn from '../ui/LikeBtn/LikeBtn';

import { CurrentUser } from '../../contexts/CurrentUserContext';

import { convertDuration } from '../../utils/convertDuration';
import { MOVIE_COVER_URL } from '../../utils/constants';

import './MovieCard.css';

const MovieCard = ({ extraClass = '', card, cbBtnClick }) => {
  const location = useLocation();
  const { user } = useContext(CurrentUser);

  const [isLikeRequest, setIsLikeRequest] = useState(false);

  const handleLikeClick = async () => {
    setIsLikeRequest(true);
    await cbBtnClick(card);
    setIsLikeRequest(false);
  };

  const convertedDuration = useMemo(() => convertDuration(card.duration), [card.duration]);

  return (
    <article className={`movie-card ${extraClass}`}>
      <h2 className="movie-card__name">{card.nameRU}</h2>
      <p className="movie-card__duration">{convertedDuration}</p>
      <a
        className="movie-card__trailer-link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Ссылка на трейлер."
      >
        <img
          className="movie-card__cover"
          src={
            typeof card.image === 'string'
              ? card.image
              : `${MOVIE_COVER_URL}${card.image.url}`
          }
          alt="Постер фильма."
        />
      </a>

      {location.pathname === '/movies' ? (
        <LikeBtn
          extraClass="movie-card__btn"
          type="button"
          isLiked={card.owner === user._id}
          onClick={handleLikeClick}
          disabled={isLikeRequest}
        >
          Сохранить
        </LikeBtn>
      ) : (
        <button
          className="movie-card__del-btn"
          type="button"
          aria-label="Удалить фильм из сохраненных."
          onClick={handleLikeClick}
          disabled={isLikeRequest}
        />
      )}
    </article>
  );
};

export default MovieCard;
