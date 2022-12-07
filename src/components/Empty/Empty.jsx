import './Empty.css';

const Empty = ({ heading, text }) => {
  return (
    <div className="empty">
      <p className="empty__heading">{heading}</p>
      <p className="empty__text">{text}</p>
    </div>
  );
};

export default Empty;
