import './BurgerButton.css';

const BurgerButton = ({ extraClass, ...restProps }) => {
  return (
    <button className={`burger-btn ${extraClass}`} type="button" {...restProps}>
      <svg
        className="burger-btn__svg"
        viewBox="0 0 28 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 3H0V0h28v3ZM28 13H0v-3h28v3ZM28 23H0v-3h28v3Z"
        />
      </svg>
    </button>
  );
};

export default BurgerButton;
