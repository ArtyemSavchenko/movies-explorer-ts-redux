import { FC } from 'react';

import { UITextElement } from '../../../../types/ui';

import styles from './Tech.module.css';

const Tech: FC<UITextElement> = ({ children }) => {
  return <p className={styles.tech}>{children}</p>;
};

export default Tech;
