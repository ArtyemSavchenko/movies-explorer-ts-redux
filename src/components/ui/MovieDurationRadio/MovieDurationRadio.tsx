import classNames from 'classnames';
import { FC, memo } from 'react';

import styles from './MovieDurationRadio.module.css';

export type IMovieDuration = 'all' | 'short' | 'long';

interface MovieDurationRadioProps {
  durationType: IMovieDuration;
  setDurationType: (type: IMovieDuration) => void;
  extraClass?: string;
}

const MovieDurationRadio: FC<MovieDurationRadioProps> = ({
  durationType,
  setDurationType,
  extraClass,
}) => {
  return (
    <div className={classNames(styles.movieDuration, extraClass)}>
      <input
        className={styles.movieDuration__radio}
        type="radio"
        name="movie-duration"
        id="movie-duration-all"
        value="all"
        checked={durationType === 'all'}
        onChange={(e) => {
          setDurationType(e.target.value as IMovieDuration);
        }}
      />
      <label
        className={styles.movieDuration__radioLabel}
        htmlFor="movie-duration-all"
      >
        все
      </label>
      <input
        className={styles.movieDuration__radio}
        type="radio"
        name="movie-duration"
        id="movie-duration-long"
        value="long"
        checked={durationType === 'long'}
        onChange={(e) => {
          setDurationType(e.target.value as IMovieDuration);
        }}
      />
      <label
        className={styles.movieDuration__radioLabel}
        htmlFor="movie-duration-long"
      >
        длинные
      </label>
      <input
        className={styles.movieDuration__radio}
        type="radio"
        name="movie-duration"
        id="movie-duration-short"
        value="short"
        checked={durationType === 'short'}
        onChange={(e) => {
          setDurationType(e.target.value as IMovieDuration);
        }}
      />
      <label
        className={styles.movieDuration__radioLabel}
        htmlFor="movie-duration-short"
      >
        короткие
      </label>
    </div>
  );
};

export default memo(MovieDurationRadio);
