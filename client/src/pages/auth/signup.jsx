import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un email valido')
    .required('Ingrese su email'),
  userName: Yup.string()
    .min(3, 'El nombre es demasiado corto')
    .max(50, 'El nombre es demasiado largo')
    .required('Ingrese su nombre de usuario'),
  password: Yup.string()
    .min(3, 'La contraseña es demasiado corta')
    .max(50, 'La contraseña es demasiado larga')
    .required('Ingrese su contraseña'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'las contraseñas deben coincidir'),
});

const Signup = () => {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const signupHandler = async (data) => {
    try {
      await auth.signup(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    auth.redirect ? <Redirect to={auth.redirect} />
      : (
        <Formik
          validationSchema={SignupSchema}
          onSubmit={signupHandler}
          initialValues={{
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
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

            <Container>
              <Row style={{ marginBlock: '5rem' }}>
                <Col style={{ maxWidth: '50rem', margin: 'auto' }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Registrarse</Card.Title>
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                          <Form.Label htmlFor="email-input">Direccion de email</Form.Label>
                          <Form.Control
                            id="email-input"
                            type="email"
                            placeholder="Ingrese su email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label htmlFor="username-input">Nombre de usuario</Form.Label>
                          <Form.Control
                            id="username-input"
                            type="userName"
                            placeholder="Ingrese su nombre"
                            name="userName"
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.userName && errors.userName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.userName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label htmlFor="password-input">Contraseña</Form.Label>
                          <Form.Control
                            id="password-input"
                            type="password"
                            placeholder="Ingrese su nueva contraseña"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label htmlFor="confirmPassword-input">Repita la contraseña</Form.Label>
                          <Form.Control
                            id="confirmPassword-input"
                            type="password"
                            placeholder="Ingrese su nueva contraseña"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.confirmPassword && errors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {error
                          ? (
                            <Alert variant="danger" data-testid="error-message">
                              {error}
                            </Alert>
                          )
                          : null }
                        <Button variant="primary" type="submit" data-testid="signup-button">
                          Registrarse
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </Formik>
      )
  );
};

export default Signup;
