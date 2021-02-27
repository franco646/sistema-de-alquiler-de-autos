import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import style from './car.module.scss';

const Car = ({
  car, onDetail, onEdit, onDelete,
}) => {
  const { url } = useRouteMatch();
  return (
    <Card className={`shadow p-3 mb-3 bg-white rounded ${style.card}`} data-testid="car-card">
      <Container>
        <Row>
          <Col className={style.col}>
            <Card.Body className={style.cardBody}>
              <Card.Title data-testid="car-title">
                {car.marca}
                {' '}
                {car.modelo}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{car.año}</Card.Subtitle>
              <Link to={`${url}/car-detail`}>
                <Button variant="primary" className={style.btn} onClick={onDetail} style={{ width: '110px' }}>{car.disponible ? 'Ver/Alquilar' : 'Ver'}</Button>
              </Link>
              <Link to={`${url}/edit-car`} data-testid="edit-button">
                <Button variant="primary" className={style.btn} onClick={onEdit}>Editar</Button>
              </Link>
              <Button variant="danger" className={style.btn} onClick={onDelete} id="delete-button">
                Eliminar
                {' '}
                <FiTrash2 />
              </Button>

            </Card.Body>
          </Col>
          <Col className={`card-img-container ${style.cardImgContainer}`} sm={3}>
            <Card.Img src={`http://localhost:8080/${car.imagen}`} className={style.cardImg} />
          </Col>
        </Row>
      </Container>

    </Card>
  );
};

Car.defaultProps = {
  onDetail: () => {},
  onEdit: () => {},
  onDelete: () => {},
  car: {
    marca: '',
    modelo: '',
    año: '',
    imagen: '',
  },
};

Car.propTypes = {
  onDetail: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  car: PropTypes.shape({
    disponible: PropTypes.bool.isRequired,
    marca: PropTypes.string,
    modelo: PropTypes.string,
    año: PropTypes.number,
    id: PropTypes.number.isRequired,
    imagen: PropTypes.string,
  }),
};

export default Car;
