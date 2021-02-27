import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../../contexts/auth-context';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un email valido')
    .required('Ingrese su email'),
  password: Yup.string()
    .min(3, 'La contraseña es demasiado corta')
    .max(50, 'La contraseña es demasiado larga')
    .required('Ingrese su contraseña'),
});

const Login = () => {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const loginHandler = async (data) => {
    try {
      await auth.login(data);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Formik
      validationSchema={LoginSchema}
      onSubmit={loginHandler}
      initialValues={{
        email: '',
        password: '',
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
                  <Card.Title>Iniciar sesion</Card.Title>
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Direccion de email</Form.Label>
                      <Form.Control
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
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Contraseña"
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
                    {error
                      ? (
                        <Alert variant="danger" data-testid="error-message">
                          {error}
                        </Alert>
                      )
                      : null }
                    <Button variant="primary" type="submit" data-testid="login-button">
                      Iniciar sesion
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};

export default Login;
