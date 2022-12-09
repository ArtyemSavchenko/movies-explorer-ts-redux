import { CSSProperties } from 'react';

import { COLORS } from '../../../utils/constants';

import styles from './Preloader.module.css';

const getRandomColor = (): string => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <span
          className={styles.preloader__round}
          style={{ "--ui-accent-color": getRandomColor() } as CSSProperties}
        />
      </div>
    </div>
  );
};

export default Preloader;
