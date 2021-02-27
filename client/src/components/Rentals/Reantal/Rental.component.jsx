import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const rental = () => (
  <Card className="shadow p-3 mb-3 bg-white rounded">
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the  content.
      </Card.Text>
      <Button variant="primary">Alquilar</Button>
      <Button variant="primary">Editar</Button>
      <Button variant="danger">Eliminar</Button>
    </Card.Body>
  </Card>
);

export default rental;
