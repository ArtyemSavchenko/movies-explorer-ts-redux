import {
  FC,
  ChangeEventHandler,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { UIForm } from '../../types/ui';

import styles from './SearchMovieForm.module.css';
import MovieDurationRadio, {
  IMovieDuration,
} from '../ui/MovieDurationRadio/MovieDurationRadio';

interface SearchMovieFormProps extends UIForm {
  extraClass?: string;
  durationType: IMovieDuration;
  setDurationType: (type: IMovieDuration) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

const SearchMovieForm: FC<SearchMovieFormProps> = ({
  extraClass,
  durationType,
  setDurationType,
  searchString,
  setSearchString,
}) => {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchString(e.target.value);
    },
    []
  );

  return (
    <div className={classNames(styles.searchMovieForm, extraClass)}>
      <div className={styles.searchMovieForm__searchBox}>
        <input
          className={styles.searchMovieForm__input}
          value={searchString}
          type="text"
          placeholder="Фильм"
          onChange={handleChangeInput}
        />
        <button
          className={styles.searchMovieForm__clearBtn}
          type="button"
          onClick={() => setSearchString('')}
          aria-label="Найти фильм."
        />
      </div>

      <MovieDurationRadio
        durationType={durationType}
        setDurationType={setDurationType}
        extraClass={styles.searchMovieForm__durationType}
      />
    </div>
  );
};

export default SearchMovieForm;
