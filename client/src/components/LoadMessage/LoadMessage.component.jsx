import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const loadMessage = () => (
  <div style={{ textAlign: 'center', fontSize: '25px' }}>
    <Spinner animation="border" variant="danger" />
    {' '}
    Cargando
  </div>
);

export default loadMessage;
