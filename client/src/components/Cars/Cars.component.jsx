import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Car from './Car/Car.component';

const cars = ({
  list, filter, onDelete, onEdit, onDetail, BASE_URL
}) => {
  let filteredList = list;
  if (filter === 'Disponibles') {
    filteredList = list.filter((car) => car.disponible === true);
  }
  if (filter === 'Alquilados') {
    filteredList = list.filter((car) => car.disponible === false);
  }
  return (
    filteredList.length > 0
      ? filteredList.map((auto) => (
        <Car
          BASE_URL={BASE_URL}
          onDelete={() => onDelete(auto.id)}
          onEdit={() => onEdit(auto.id)}
          onDetail={() => onDetail(auto.id)}
          key={auto.id}
          car={auto}
        />
      ))
      : <Alert variant="dark" style={{ textAlign: 'center' }} data-testid="empty-message"><Alert.Heading>No se encontraron autos disponibles</Alert.Heading></Alert>
  );
};

export default cars;
