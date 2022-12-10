import { FC } from 'react';
import classNames from 'classnames';

import { UITextElement } from '../../../../types/ui';

import styles from './BaseText.module.css';

const BaseText: FC<UITextElement> = ({ children, extraClass }) => {
  return <p className={classNames(styles.baseText, extraClass)}>{children}</p>;
};

export default BaseText;
