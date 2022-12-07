import './LikeBtn.css';

const LikeBtn = ({ extraClass = '', children, isLiked, ...restProps }) => {
  return (
    <button
      className={`like-btn ${isLiked ? 'like-btn_is-liked' : ''} ${extraClass}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default LikeBtn;
