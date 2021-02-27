import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import './CarForm.modules.scss';

const CarFormSchema = Yup.object().shape({
  marca: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  modelo: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  año: Yup.number()
    .required('Este campo es obligatorio')
    .min(1000, 'ingrese un año valido')
    .max(3000, 'ingrese un año valido'),
  kms: Yup.number()
    .required('Este campo es obligatorio')
    .min(0)
    .max(99999999999999999999999999999999999999999999999999, 'ingrese un numero menor'),
  aireAcondicionado: Yup.string()
    .required('Este campo es obligatorio'),
  color: Yup.string()
    .required('Este campo es obligatorio')
    .min(3, 'Debe tener minimo 3 caracteres')
    .max(50, 'Debe tener maximo 50 caracteres'),
  pasajeros: Yup.string()
    .required('Este campo es obligatorio'),
  manualAutomatico: Yup.string()
    .required('Este campo es obligatorio'),
  precioAlquilerPorDia: Yup.number()
    .max(99999999999999999999999999999999999999999999999999, 'ingrese un numero menor')
    .required('Este campo es obligatorio'),
});

const CarForm = ({ onHideForm, onFinishEdit, data }) => {
  const [file, setFile] = useState();
  const validateFile = () => {
    let error;
    if (data) {
      return error;
    }
    if (!file) {
      error = 'Imagen Obligatoria';
    }
    return error;
  };
  return (
    <Formik
      initialValues={{
        marca: data ? data.marca : '',
        modelo: data ? data.modelo : '',
        año: data ? data.año : '',
        kms: data ? data.kms : '',
        aireAcondicionado: data ? data.aireAcondicionado : 'si',
        color: data ? data.color : '',
        imagen: '',
        pasajeros: data ? data.pasajeros : '1',
        precioAlquilerPorDia: data ? data.precioAlquilerPorDia : '',
        manualAutomatico: data ? data.manualAutomatico : 'manual',
      }}
      validationSchema={CarFormSchema}
      onSubmit={(values) => {
        onHideForm();
        setTimeout(() => {
          onFinishEdit(values, file);
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
        <Form onSubmit={handleSubmit} noValidate data-testid="car-form">
          <Form.Group>
            <Form.Label htmlFor="marca-input">Marca</Form.Label>
            <Form.Control
              type="text"
              id="marca-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="marca"
              value={values.marca}
              isInvalid={touched.marca && errors.marca}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.marca && errors.marca}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="modelo-input">modelo</Form.Label>
            <Form.Control
              type="text"
              id="modelo-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="modelo"
              value={values.modelo}
              isInvalid={touched.modelo && errors.modelo}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.modelo && errors.modelo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="año-input">año</Form.Label>
            <Form.Control
              type="number"
              id="año-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="año"
              value={values.año}
              isInvalid={touched.año && errors.año}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.año && errors.año}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="kms-input">kms</Form.Label>
            <Form.Control
              type="number"
              id="kms-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="kms"
              value={values.kms}
              isInvalid={touched.kms && errors.kms}
              required
            />
            <Form.Control.Feedback type="invalid">
              {touched.kms && errors.kms}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="color-input">Color</Form.Label>
            <Form.Control
              type="text"
              id="color-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="color"
              value={values.color}
              required
              isInvalid={touched.color && errors.color}
            />
            <Form.Control.Feedback type="invalid">
              {touched.color && errors.color}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Field
              data-testid="input-image"
              name="imagen"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              validate={validateFile}
            />
            {errors.imagen && touched.imagen && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.imagen}</div>}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="aire-acondicionado-input">Aire acondicionado</Form.Label>
            <Form.Control
              as="select"
              id="aire-acondicionado-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="aireAcondicionado"
              value={values.aireAcondicionado}
              required
            >
              <option value="si">Si</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="pasajeros-input">Pasajeros</Form.Label>
            <Form.Control
              as="select"
              id="pasajeros-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="pasajeros"
              value={values.pasajeros}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="manualAutomatico-input">Caja</Form.Label>
            <Form.Control
              as="select"
              id="manualAutomatico-input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="manualAutomatico"
              value={values.manualAutomatico}
            >
              <option value="manual">Manual</option>
              <option value="automatico">Automatica</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="precioAlquilerPorDia-input">Precio de alquiler por dia</Form.Label>
            <Form.Control
              id="precioAlquilerPorDia-input"
              type="number"
              placeholder="$0"
              onChange={handleChange}
              onBlur={handleBlur}
              name="precioAlquilerPorDia"
              value={values.precioAlquilerPorDia}
              isInvalid={touched.precioAlquilerPorDia && errors.precioAlquilerPorDia}
            />
            <Form.Control.Feedback type="invalid">
              {touched.precioAlquilerPorDia && errors.precioAlquilerPorDia}
            </Form.Control.Feedback>

          </Form.Group>

          <Button variant="primary" type="submit">Finalizar</Button>
          {' '}
          <Button variant="danger" onClick={onHideForm}>Cancelar</Button>

        </Form>
      )}

    </Formik>
  );
};

CarForm.defaultProps = {
  data: null,
  onHideForm: () => {},
  onFinishEdit: () => {},
};

CarForm.propTypes = {
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

export default CarForm;
