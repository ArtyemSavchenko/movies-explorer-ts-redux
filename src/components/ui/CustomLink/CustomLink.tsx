import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './CustomLink.module.css';

type CustomLinkType = 'button' | 'internal-link' | 'external-link';
type CustomLinkAppearance = 'attention' | 'accent';

export interface CustomLinkProps {
  feature: CustomLinkType;
  appearance?: CustomLinkAppearance;
  children?: ReactNode;
  extraClass?: string;
  isLoading?: boolean;
  disabled?: boolean;
  [rest: string]: any;
}

export const CustomLink: FC<CustomLinkProps> = ({
  feature,
  appearance,
  isLoading,
  disabled,
  extraClass,
  children,
  ...restProps
}) => {
  const className = classNames(
    styles.customLink,
    {
      [styles.customLink_type_accent]: appearance === 'accent',
      [styles.customLink_type_attention]: appearance === 'attention',
    },
    extraClass
  );

  switch (feature) {
    case 'button':
      return (
        <button
          className={className}
          disabled={disabled || isLoading}
          {...restProps}
        >
          {isLoading ? (
            <div className="custom-link__spinner">
              <div className="custom-link__spinner-el"></div>
            </div>
          ) : (
            children
          )}
        </button>
      );

    case 'internal-link':
      return (
        <Link className={className} to="" {...restProps}>
          {children}
        </Link>
      );

    case 'external-link':
      return (
        <a
          className={className}
          target="_blank"
          rel="noreferrer"
          {...restProps}
        >
          {children}
        </a>
      );

    default:
      console.error(
        `TypeError: unknown feature '${feature}' of CustomLink.\nAllowed options:\n  button - <button>,\n  internal-link - <Link>,\n  external-link - <a>`
      );
      return null;
  }
};