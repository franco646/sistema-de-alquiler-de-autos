/* eslint-env jest */
import React from 'react';
import {
  fireEvent, render, waitFor,
} from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RentalForm from '../Form/RentalForm/RentalForm.component';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  const route = '/rental/edit-rental/1';
  history.push(route);
  return {
    ...render(
      <Router history={history}>
        <Route path="/rental/edit-rental/:carId">
          {component}
        </Route>
      </Router>,
    ),
  };
};

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

describe('<RentalForm />', () => {
  it('should render and submi the complete form', async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = renderWithRouter(
      <RentalForm
        onFinishEdit={handleSubmit}
      />,
    );
    await waitFor(() => fireEvent.change(getByLabelText('Alquiler desde:'), { target: { value: today } }));
    await waitFor(() => fireEvent.change(getByLabelText('Alquiler hasta:'), { target: { value: today } }));
    await waitFor(() => fireEvent.change(getByLabelText('Nombres'), { target: { value: 'nombre' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Apellidos'), { target: { value: 'apellido' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Nro. De Documento'), { target: { value: '123456' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Fecha de nacimiento'), { target: { value: '2021-02-06' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Nacionalidad'), { target: { value: 'argentina' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Dirección'), { target: { value: 'calle de prueba 123' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Telefono'), { target: { value: '12345567' } }));
    await waitFor(() => fireEvent.change(getByLabelText('Email'), { target: { value: 'usuario@test.com.ar' } }));

    await waitFor(() => fireEvent.click(getByText('Finalizar')));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
      alquilerDesde: today,
      alquilerHasta: today,
      apellidos: 'apellido',
      direccion: 'calle de prueba 123',
      email: 'usuario@test.com.ar',
      fechaNacimiento: '2021-02-06',
      medioDePago: 'Efectivo',
      nacionalidad: 'argentina',
      nombres: 'nombre',
      numeroDocumento: 123456,
      telefono: 12345567,
      tipoDocumento: 'D.N.I',
    }, '1'));
  });
  it('should not submit the form if is not complete', async () => {
    const handleSubmit = jest.fn();
    const { getByText } = renderWithRouter(
      <RentalForm
        onFinishEdit={handleSubmit}
      />,
    );

    await waitFor(() => fireEvent.click(getByText('Finalizar')));

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
  });
});
