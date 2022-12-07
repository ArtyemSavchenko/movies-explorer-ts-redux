import { useState } from 'react';

import { COLORS } from '../../../utils/constants';

import './Logo.css';

const Logo = ({ extraClass = '', funny = false }) => {
  const [fill, setFill] = useState('');

  const getRandomColor = () => {
    if (funny) {
      const count = COLORS.length;
      const newColor = COLORS[Math.floor(Math.random() * count)];
      if (fill !== newColor) {
        setFill(newColor);
      } else {
        setFill('#3ddc84');
      }
    }
  };

  return (
    <svg
      className={`logo ${extraClass}`}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      onPointerEnter={getRandomColor}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={fill}
        d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19Zm0-9.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
      />
    </svg>
  );
};

export default Logo;
