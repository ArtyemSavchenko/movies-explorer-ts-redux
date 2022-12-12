import { FC, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import LikeBtn from '../ui/LikeBtn/LikeBtn';

import { CurrentUser } from '../../contexts/CurrentUserContext';
import { IMovie } from '../../types/movie';

import { convertDuration } from '../../utils/convertDuration';

import styles from './MovieCard.module.css';

interface MovieCardProps {
  card: IMovie;
  cbBtnClick: (card: IMovie) => void;
  extraClass?: string;
}

const MovieCard: FC<MovieCardProps> = ({ extraClass, card, cbBtnClick }) => {
  const location = useLocation();
  const { user } = useContext(CurrentUser);

  const [isLikeRequest, setIsLikeRequest] = useState(false);

  const handleLikeClick = async () => {
    setIsLikeRequest(true);
    await cbBtnClick(card);
    setIsLikeRequest(false);
  };

  const convertedDuration = useMemo(
    () => convertDuration(card.duration),
    [card.duration]
  );

  return (
    <article className={classNames(styles.movieCard, extraClass)}>
      <h2 className={styles.movieCard__name}>{card.nameRU}</h2>
      <p className={styles.movieCard__duration}>{convertedDuration}</p>
      <a
        className={styles.movieCard__trailerLink}
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Ссылка на трейлер."
      >
        <img
          className={styles.movieCard__cover}
          src={card.image}
          alt="Постер фильма."
        />
      </a>

      {location.pathname === '/movies' ? (
        <LikeBtn
          extraClass={styles.movieCard__btn}
          type="button"
          isLiked={card.owner === user._id}
          onClick={handleLikeClick}
          disabled={isLikeRequest}
        >
          Сохранить
        </LikeBtn>
      ) : (
        <button
          className={styles.movieCard__delBtn}
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
