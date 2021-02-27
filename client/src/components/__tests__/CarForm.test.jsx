/* eslint-env jest */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import CarForm from '../Form/CarForm/CarForm.component';

describe('<CarForm />', () => {
  it('should render and submi the complete form', async () => {
    const handleSubmit = jest.fn();
    render(<CarForm onFinishEdit={handleSubmit} />);

    const file = new File(['(⌐□_□)'], 'testImage.png', { type: 'image/png' });
    const imageInput = screen.getByTestId('input-image');

    fireEvent.change(imageInput, { target: { files: [file] } });
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: 'amarillo' } });
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'ford' } });
    fireEvent.change(screen.getByLabelText('modelo'), { target: { value: 'fiesta' } });
    fireEvent.change(screen.getByLabelText('año'), { target: { value: 2001 } });
    fireEvent.change(screen.getByLabelText('kms'), { target: { value: 1000 } });
    fireEvent.change(screen.getByLabelText('Precio de alquiler por dia'), { target: { value: 1000 } });

    await waitFor(() => fireEvent.click(screen.getByText('Finalizar')));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
      marca: 'ford',
      modelo: 'fiesta',
      año: 2001,
      kms: 1000,
      aireAcondicionado: 'si',
      color: 'amarillo',
      imagen: '',
      pasajeros: '1',
      precioAlquilerPorDia: 1000,
      manualAutomatico: 'manual',
    }, expect.anything()));
  });
  it('should not submit the form if is not complete', async () => {
    const handleSubmit = jest.fn();
    render(<CarForm onFinishEdit={handleSubmit} />);
    await waitFor(() => fireEvent.click(screen.getByText('Finalizar')));

    expect(handleSubmit).not.toHaveBeenCalled();
  });
  it('should render form with data received', async () => {
    render(<CarForm data={{ marca: 'ford', modelo: 'fiesta' }} />);
    expect(screen.getByLabelText('Marca').value).toBe('ford');
    expect(screen.getByLabelText('modelo').value).toBe('fiesta');
  });
});
