import './BaseText.css';

const BaseText = ({ children, extraClass = '' }) => {
  return (
    <p className={`base-text ${extraClass}`}>{children}</p>
  );
};

export default BaseText;
