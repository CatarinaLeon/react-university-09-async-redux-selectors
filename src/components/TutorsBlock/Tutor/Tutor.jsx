/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import { ReactComponent as PhoneIcon } from 'images/phone.svg';
import { ReactComponent as MailIcon } from 'images/mail.svg';
import { ReactComponent as LocationIcon } from 'images/location.svg';

const blockStyles = {
  display: 'flex',
  padding: 14,
  fontSize: 16,
  lineHeight: 1.5,
};

const nameStyles = {
  paddingRight: 24,
  flex: '0 0 200px',
};

const dataStyles = {
  ...nameStyles,
  flexBasis: 300,
};

const dataTextStyles = {
  display: 'flex',
  alignItems: 'center',
  '& .text': {
    marginLeft: 8,
  },
};

const Tutor = props => {
  const { firstName, lastName, gender, phone, email, city, isFullTime } = props;
  return (
    <div css={blockStyles}>
      <div css={nameStyles}>
        <p>{lastName}</p>
        <p>{firstName}</p>
        <p>{gender}</p>
      </div>
      <div css={dataStyles}>
        <p css={dataTextStyles}>
          <PhoneIcon />
          <span className="text">{phone}</span>
        </p>
        <p css={dataTextStyles}>
          <MailIcon />
          <span className="text">{email}</span>
        </p>
        <p css={dataTextStyles}>
          <LocationIcon />
          <span className="text">{city}</span>
        </p>
      </div>
      <div>
        <p>На постоянной основе: {isFullTime ? 'Да' : 'Нет'}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  isFullTime: PropTypes.bool,
};

export default Tutor;
