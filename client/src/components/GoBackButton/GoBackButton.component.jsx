import { useHistory } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const GoBackButton = ({ children, variant }) => {
  const history = useHistory();
  return (
    <>
      <Button variant={variant} onClick={() => history.goBack()}>{children}</Button>
      {' '}
    </>
  );
};

GoBackButton.defaultProps = {
  variant: 'primary',
};

GoBackButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default GoBackButton;
