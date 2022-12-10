import { FC, ChangeEventHandler, FormEventHandler, useState } from 'react';
import classNames from 'classnames';

import { UIForm } from '../../types/ui';
import ModernCheckbox from '../ui/ModernCheckbox/ModernCheckbox';

import styles from './SearchMovieForm.module.css';

interface SearchMovieFormProps extends UIForm {
  extraClass?: string;
  onSubmit: () => void;
  isShortMovies: boolean;
  setIsShortMovies: (isShortMovie: boolean) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

const SearchMovieForm: FC<SearchMovieFormProps> = ({
  extraClass,
  onSubmit,
  isShortMovies,
  setIsShortMovies,
  searchString,
  setSearchString,
  ...restProps
}) => {
  const [searchErr, setSearchErr] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!searchString) {
      setSearchErr('Нужно ввести ключевое слово');
      return;
    }

    onSubmit();
  };

  const changeMovieName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchErr('');
    setSearchString(e.target.value);
  };

  const changeIsShortMovie: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsShortMovies(e.target.checked)
  }

  return (
    <form
      className={classNames(styles.searchMovieForm, extraClass)}
      onSubmit={handleSubmit}
      noValidate
      {...restProps}
    >
      <div className={styles.searchMovieForm__searchBox}>
        <input
          className={styles.searchMovieForm__input}
          value={searchString}
          onChange={changeMovieName}
          type="text"
          placeholder="Фильм"
          name="name"
          required
        />
        <button
          className={styles.searchMovieForm__submitBtn}
          type="submit"
          aria-label="Найти фильм."
        />
      </div>
      <p className={styles.searchMovieForm__err}>{searchErr}</p>

      <ModernCheckbox
        extraClass={styles.searchMovieForm__shortMovies}
        label="Короткометражки"
        checked={isShortMovies}
        onChange={changeIsShortMovie}
      />
    </form>
  );
};

export default SearchMovieForm;
