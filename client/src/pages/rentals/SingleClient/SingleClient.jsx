import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const singleClient = ({ client }) => {
  const history = useHistory();
  return (
    <Container>
      <Row style={{ marginTop: '3rem' }}>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                {`${client.nombres} ${client.apellidos}`}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{client.email}</Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Documento:
                  {' '}
                  {client.tipoDocumento}
                  {' '}
                  {client.numeroDocumento}
                </ListGroup.Item>
                <ListGroup.Item>
                  Direccion:
                  {' '}
                  {client.direccion}
                </ListGroup.Item>

                <ListGroup.Item>
                  Fecha de nacimiento:
                  {' '}
                  {client.fechaNacimiento}
                </ListGroup.Item>
                <ListGroup.Item>
                  Nacionalidad:
                  {' '}
                  {client.nacionalidad}
                </ListGroup.Item>
                <ListGroup.Item>
                  Numero de telefono:
                  {' '}
                  {client.telefono}
                </ListGroup.Item>
              </ListGroup>
              <Card.Link href="#"><Button onClick={() => history.goBack()}>Volver</Button></Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default singleClient;
