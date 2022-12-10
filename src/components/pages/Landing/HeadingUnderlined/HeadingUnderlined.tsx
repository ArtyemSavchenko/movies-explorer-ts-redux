import { FC } from 'react';
import classNames from 'classnames';

import { UITextElement } from '../../../../types/ui';

import styles from './HeadingUnderlined.module.css';

const HeadingUnderlined: FC<UITextElement> = ({
  children,
  extraClass = '',
}) => {
  return (
    <h2 className={classNames(styles.headingUnderlined, extraClass)}>
      {children}
    </h2>
  );
};

export default HeadingUnderlined;
