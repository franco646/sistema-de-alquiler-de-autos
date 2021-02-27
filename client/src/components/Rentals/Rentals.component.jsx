/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useRouteMatch } from 'react-router-dom';
import { BsDownload } from 'react-icons/bs';
import Alert from 'react-bootstrap/Alert';
import Table from '../Table/Table.component';

const Rentals = ({
  list, onClientDetail, onFinishRental, filter, onDeleteRental, onDownloadPDF,
}) => {
  const { path } = useRouteMatch();
  let filteredList = list;
  if (filter === 'Alquilados') {
    filteredList = list.filter((rental) => rental.estado === 'Alquilado');
  }
  if (filter === 'Finalizados') {
    filteredList = list.filter((rental) => rental.estado === 'Finalizado');
  }
  return (
    filteredList.length > 0
      ? (
        <Table items={['Nro.', 'Cliente', 'Auto', 'Alquiler desde', 'Alquiler hasta', 'Medio de pago', 'Total', 'Estado', 'Acciones']}>
          {filteredList.map((rental, index) => (
            <tr key={rental.id}>
              <td>{index + 1}</td>
              <td><Link to={`${path}/client-detail`} onClick={() => onClientDetail(rental.cliente)}>{`${rental.cliente.nombres} ${rental.cliente.apellidos}`}</Link></td>
              <td>{`${rental.auto.marca} ${rental.auto.modelo}`}</td>
              <td>{rental.alquilerDesde}</td>
              <td>{rental.alquilerHasta}</td>
              <td>{rental.medioDePago}</td>
              <td>{`$ ${rental.total}`}</td>
              <td>{rental.estado}</td>
              <td>
                <Button variant="primary" onClick={() => onDownloadPDF(rental.id)}>
                  <BsDownload />
                  {' '}
                  PDF
                </Button>
                {' '}
                <Button variant="danger" onClick={() => onDeleteRental(rental)}>Eliminar</Button>
                {' '}
                {rental.estado !== 'Finalizado'
                  ? <Button variant="danger" onClick={() => onFinishRental(rental.id)}>Finalizar alquiler</Button>
                  : null }
              </td>
            </tr>
          ))}
        </Table>
      )
      : <Alert variant="dark" style={{ textAlign: 'center' }} data-testid="empty-message"><Alert.Heading>No se encontraron alquileres</Alert.Heading></Alert>
  );
};

/*
    list.length > 0
      ? list.map((rental) => {
        console.log(rental);
        return (
          <Rental
            clientName={`${rental.cliente.nombres} ${rental.cliente.apellidos}`}
            carName={`${rental.auto.marca} ${rental.auto.modelo}`}
            key={rental.id}
            nombre={rental.id}
            año="hola"
          />
        );
      })
      : <h1>no se encontraron alquileres</h1>
  );

*/

export default Rentals;
