/* eslint-disable no-param-reassign */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import './RentalForm.style.scss';

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; // January is 0!
const yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}

today = `${yyyy}-${mm}-${dd}`;

const RentalFormSchema = Yup.object().shape({
  nombres: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  apellidos: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  tipoDocumento: Yup.string()
    .required('Este campo es obligatorio'),
  numeroDocumento: Yup.number()
    .required('Este campo es obligatorio')
    .min(0, 'ingrese un numero valido')
    .max(999999999999999999999999999999, 'ingrese un año valido'),
  fechaNacimiento: Yup.date()
    .required('Este campo es obligatorio')
    .max(today, 'La fecha es erronea'),
  nacionalidad: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  direccion: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  telefono: Yup.number()
    .required('Este campo es obligatorio')
    .min(0, 'ingrese un año valido')
    .max(999999999999999999999999999999, 'ingrese un año valido'),
  email: Yup.string().email('Invalid email').required('Required'),
  alquilerDesde: Yup.date()
    .required('Este campo es obligatorio')
    .min(today, 'La fecha es erronea'),
  alquilerHasta: Yup.date()
    .required('Este campo es obligatorio')
    .min(today, 'La fecha es erronea'),
  medioDePago: Yup.string()
    .required('Este campo es obligatorio'),
});

const RentalForm = ({ onHideForm, onFinishEdit }) => {
  const history = useHistory();
  const { carId } = useParams();
  return (
    <Formik
      initialValues={{
        nombres: '',
        apellidos: '',
        tipoDocumento: 'D.N.I',
        numeroDocumento: '',
        fechaNacimiento: '',
        nacionalidad: '',
        direccion: '',
        telefono: '',
        email: '',
        alquilerDesde: '',
        alquilerHasta: '',
        medioDePago: 'Efectivo',
      }}
      validationSchema={RentalFormSchema}
      onSubmit={(values) => {
        history.push('/rentals');
        setTimeout(() => {
          onFinishEdit(values, carId);
        }, 150);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Form onSubmit={handleSubmit} noValidate data-testid="rental-form">
          <Form.Group>
            <Form.Label htmlFor="nombres-input">Nombres</Form.Label>
            <Form.Control
              type="text"
              id="nombres-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="nombres"
              value={values.nombres}
              isInvalid={touched.nombres && errors.nombres}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.nombre && errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="apellidos-input">Apellidos</Form.Label>
            <Form.Control
              type="text"
              id="apellidos-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="apellidos"
              value={values.apellidos}
              isInvalid={touched.apellidos && errors.apellidos}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.apellidos && errors.apellidos}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col sm="auto" md="auto" lg="auto" xl="auto">
              <Form.Group>
                <Form.Label htmlFor="tipoDocumento-input">Tipo de documento</Form.Label>
                <Form.Control
                  as="select"
                  id="tipoDocumento-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="tipoDocumento"
                  value={values.tipoDocumento}
                >
                  <option>D.N.I</option>
                  <option>L.C</option>
                  <option>Pasaporte</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="numeroDocumento-input">Nro. De Documento</Form.Label>
                <Form.Control
                  type="number"
                  id="numeroDocumento-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="numeroDocumento"
                  value={values.numeroDocumento}
                  isInvalid={touched.numeroDocumento && errors.numeroDocumento}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {touched.numeroDocumento && errors.numeroDocumento}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label htmlFor="fechaNacimiento-input">Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              id="fechaNacimiento-input"
              onChange={handleChange}
              max={today}
              onBlur={handleBlur}
              name="fechaNacimiento"
              value={values.fechaNacimiento}
              isInvalid={touched.fechaNacimiento && errors.fechaNacimiento}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.fechaNacimiento && errors.fechaNacimiento}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="nacionalidad-input">Nacionalidad</Form.Label>
            <Form.Control
              type="text"
              id="nacionalidad-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="nacionalidad"
              value={values.nacionalidad}
              isInvalid={touched.nacionalidad && errors.nacionalidad}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.nacionalidad && errors.nacionalidad}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="direccion-input">Dirección</Form.Label>
            <Form.Control
              type="text"
              id="direccion-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="direccion"
              value={values.direccion}
              required
              isInvalid={touched.direccion && errors.direccion}
            />
            <Form.Control.Feedback type="invalid">
              {touched.direccion && errors.direccion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="telefono-input">Telefono</Form.Label>
            <Form.Control
              type="number"
              id="telefono-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="telefono"
              value={values.telefono}
              required
              isInvalid={touched.telefono && errors.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {touched.telefono && errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="email-input">Email</Form.Label>
            <Form.Control
              type="email"
              id="email-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              value={values.email}
              required
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {touched.email && errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="alquilerDesde-input">Alquiler desde: </Form.Label>
                <Form.Control
                  type="date"
                  min={today}
                  id="alquilerDesde-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="alquilerDesde"
                  value={values.alquilerDesde}
                  isInvalid={touched.alquilerDesde && errors.alquilerDesde}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {touched.alquilerDesde && errors.alquilerDesde}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="alquilerHasta-input">Alquiler hasta:</Form.Label>
                <Form.Control
                  min={today}
                  type="date"
                  id="alquilerHasta-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="alquilerHasta"
                  value={values.alquilerHasta}
                  isInvalid={touched.alquilerHasta && errors.alquilerHasta}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {touched.alquilerHasta && errors.alquilerHasta}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label htmlFor="medioDePago-input">Medio de pago</Form.Label>
            <Form.Control
              as="select"
              id="medioDePago-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="medioDePago"
              value={values.medioDePago}
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">Finalizar</Button>
          {' '}
          <Button variant="danger" onClick={onHideForm}>Cancelar</Button>

        </Form>
      )}

    </Formik>
  );
};

RentalForm.defaultProps = {
  data: null,
  onHideForm: () => {},
  onFinishEdit: () => {},
};

RentalForm.propTypes = {
  onHideForm: PropTypes.func,
  onFinishEdit: PropTypes.func,
  data: PropTypes.shape({
    marca: PropTypes.string,
    modelo: PropTypes.string,
    año: PropTypes.number,
    kms: PropTypes.number,
    color: PropTypes.string,
    pasajeros: PropTypes.number,
    aireAcondicionado: PropTypes.string,
    manualAutomatico: PropTypes.string,
    precioAlquilerPorDia: PropTypes.number,
  }),
};

export default RentalForm;
