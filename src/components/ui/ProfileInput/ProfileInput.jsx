import { useId } from 'react';

import './ProfileInput.css';

const ProfileInput = ({ label, extraClass = '', error = '', ...restProps }) => {
  const id = useId();

  return (
    <div className={`profile-input ${extraClass}`}>
      <input className="profile-input__input" {...restProps} id={id} />
      <label className="profile-input__label" htmlFor={id}>
        {label}
      </label>
      <p className="profile-input__err">{error}</p>
    </div>
  );
};

export default ProfileInput;
