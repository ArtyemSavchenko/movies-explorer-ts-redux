import { FC } from 'react';

import styles from './EmptySearch.module.css';

interface EmptySearchProps {
  heading: string;
  text: string;
}

const EmptySearch: FC<EmptySearchProps> = ({ heading, text }) => {
  return (
    <div className={styles.emptySearch}>
      <p className={styles.emptySearch__heading}>{heading}</p>
      <p className={styles.emptySearch__text}>{text}</p>
    </div>
  );
};

export default EmptySearch;
