import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { UIButton } from '../../../types/ui';

import styles from './LikeBtn.module.css';

interface LikeBtnProps extends UIButton {
  isLiked?: boolean;
  extraClass?: string;
  children?: ReactNode;
}

const LikeBtn: FC<LikeBtnProps> = ({
  extraClass,
  children,
  isLiked,
  ...restProps
}) => {
  return (
    <button
      className={classNames(
        styles.likeBtn,
        isLiked && styles.likeBtn_isLiked,
        extraClass
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default LikeBtn;
