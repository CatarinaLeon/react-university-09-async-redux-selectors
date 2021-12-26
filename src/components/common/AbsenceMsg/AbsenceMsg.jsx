import React from 'react';
import PropTypes from 'prop-types';

const AbsenceMsg = ({ absentEntity }) => {
  return <h4 className="absence-msg">No {absentEntity} yet</h4>;
};

AbsenceMsg.propTypes = {
  absentEntity: PropTypes.string.isRequired,
};

export default AbsenceMsg;
