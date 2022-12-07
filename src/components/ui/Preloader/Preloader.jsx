import { useEffect, useState } from 'react';

import { COLORS } from '../../../utils/constants';

import './Preloader.css';

const Preloader = () => {
  const [fill, setFill] = useState('');

  const getRandomColor = () => {
    const count = COLORS.length;
    setFill(COLORS[Math.floor(Math.random() * count)]);
  };

  useEffect(() => {
    getRandomColor();
  }, []);

  return (
    <div className="preloader">
      <div className="preloader__container">
        <span
          className="preloader__round"
          style={fill ? { '--ui-accent-color': fill } : null}
        />
      </div>
    </div>
  );
};

export default Preloader;
