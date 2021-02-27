import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import style from './SingleCar.module.scss';

const SingleCar = ({ car, onDelete, BASE_URL }) => {
  const history = useHistory();
  return (
    <Card className={`shadow p-3 mb-3 bg-white rounded ${style.card}`} data-testid="single-car-component">
      <Container>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title className={style.title}>
                {car.marca}
                {' '}
                {car.modelo}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{car.año}</Card.Subtitle>
              <ListGroup variant="flush" className={style.list}>
                <ListGroup.Item>
                  kilometos:
                  {' '}
                  {car.kms}
                </ListGroup.Item>
                <ListGroup.Item>
                  Color:
                  {' '}
                  {car.color}
                </ListGroup.Item>
                <ListGroup.Item>
                  Cantidad de pasajero:
                  {' '}
                  {car.pasajeros}
                </ListGroup.Item>
                <ListGroup.Item>
                  Aire acondicionado:
                  {' '}
                  {car.aireAcondicionado}
                </ListGroup.Item>
                <ListGroup.Item>
                  Caja:
                  {' '}
                  {car.manualAutomatico}
                </ListGroup.Item>
                <ListGroup.Item>
                  Precio del alquiler por día: $
                  {car.precioAlquilerPorDia}
                </ListGroup.Item>
              </ListGroup>
              {car.disponible
                ? (
                  <Link to={`/rentals/edit-rental/${car.id}`}>
                    <Button variant="primary">Nuevo alquiler</Button>
                  </Link>
                )
                : null }
              {' '}
              <Button onClick={() => history.goBack()}>Volver</Button>
              {' '}
              <Button variant="danger" onClick={() => onDelete(car.id)}>Eliminar</Button>
            </Card.Body>
          </Col>
          <Col className={`card-img-container ${style.cardImgContainer}`} lg="6">
            <Card.Img src={`${BASE_URL}/${car.imagen}`} />
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

SingleCar.propTypes = {
  onDelete: PropTypes.func.isRequired,
  car: PropTypes.shape({
    disponible: PropTypes.bool.isRequired,
    marca: PropTypes.string.isRequired,
    modelo: PropTypes.string.isRequired,
    año: PropTypes.number.isRequired,
    kms: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    pasajeros: PropTypes.number.isRequired,
    aireAcondicionado: PropTypes.string.isRequired,
    manualAutomatico: PropTypes.string.isRequired,
    precioAlquilerPorDia: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SingleCar;
