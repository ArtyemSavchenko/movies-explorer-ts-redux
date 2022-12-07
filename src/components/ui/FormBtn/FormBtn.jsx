import './FormBtn.css';

const FormBtn = ({
  children,
  extraClass = '',
  isLoading,
  disabled,
  ...restProps
}) => {
  return (
    <button
      type="submit"
      className={`form-btn ${extraClass}`}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? (
        <div className="form-btn__spinner">
          <div className="form-btn__spinner-el"></div>
        </div>
      ) : children}
    </button>
  );
};

export default FormBtn;
