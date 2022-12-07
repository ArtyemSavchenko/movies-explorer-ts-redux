import './HeadingUnderlined.css';

const HeadingUnderlined = ({ children, extraClass = '' }) => {
  return (
    <h2 className={`heading-underlined ${extraClass}`}>{children}</h2>
  )
};

export default HeadingUnderlined;
