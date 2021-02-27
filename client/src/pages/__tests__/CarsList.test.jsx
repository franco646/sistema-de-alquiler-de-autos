/* eslint-env jest */
import React from 'react';
import {
  render, screen, waitFor, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route } from 'react-router-dom';
import CarsList from '../cars/cars-list';
import '@testing-library/jest-dom/extend-expect';

const BASE_URL = 'http://localhost:8080';
const server = setupServer(
  rest.get(`${BASE_URL}/cars`, (req, res, ctx) => res(ctx.json({
    autos: [
      {
        id: 1,
        marca: 'chevrolet',
        modelo: 'corsa',
        año: 2005,
        kms: 1231232132132,
        color: 'Blanco',
        imagen: 'uploads\\img\\imagen-1613405249763',
        aireAcondicionado: 'si',
        pasajeros: 1,
        manualAutomatico: 'manual',
        precioAlquilerPorDia: 1200,
        disponible: true,
        createdAt: '2021-02-15T16:07:29.783Z',
        updatedAt: '2021-02-15T22:38:37.235Z',
      },
      {
        id: 2,
        marca: 'chevrolet',
        modelo: 'corsa',
        año: 2005,
        kms: 1231232132132,
        color: 'Blanco',
        imagen: 'uploads\\img\\imagen-1613405249763',
        aireAcondicionado: 'si',
        pasajeros: 1,
        manualAutomatico: 'manual',
        precioAlquilerPorDia: 1200,
        disponible: false,
        createdAt: '2021-02-15T16:07:29.783Z',
        updatedAt: '2021-02-15T22:38:37.235Z',
      },
    ],
  }))),
  rest.delete(`${BASE_URL}/delete-car/:carId`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${BASE_URL}/edit-car/:carId`, (req, res, ctx) => res(
    ctx.json({
      auto: {
        id: 1,
        marca: 'ford',
        modelo: 'fiesta',
        año: 2005,
        kms: 1231232132132,
        color: 'Blanco',
        imagen: 'uploads\\img\\imagen-1613405249763',
        aireAcondicionado: 'si',
        pasajeros: 1,
        manualAutomatico: 'manual',
        precioAlquilerPorDia: 1200,
        disponible: true,
        createdAt: '2021-02-15T16:07:29.783Z',
        updatedAt: '2021-02-15T22:38:37.235Z',
      },
    }),
  )),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter initialEntries={['/cars']}>
      <Route path="/cars">
        {component}
      </Route>
    </MemoryRouter>,
  ),
});

describe('<CarsList />', () => {
  it('should show load message', async () => {
    renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
    expect(screen.getByText('Cargando').textContent).toContain('Cargando');
  });

  it('should show available cars with one component', async () => {
    renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
    await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
    expect(screen.getByTestId('car-card')).toBeInTheDocument();
    expect(screen.getAllByTestId('car-card')).toHaveLength(1);
  });

  it('should show render cars with one component when the filter is changed', async () => {
    renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
    await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
    fireEvent.click(screen.getByText('ver'));
    fireEvent.click(screen.getByText('Alquilados'));
    expect(screen.getByTestId('car-card')).toBeInTheDocument();
    expect(screen.getAllByTestId('car-card')).toHaveLength(1);
  });

  it('should show all cars when the filter is changed', async () => {
    renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
    await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
    fireEvent.click(screen.getByText('ver'));
    fireEvent.click(screen.getByText('Todos'));
    expect(screen.getAllByTestId('car-card')).toHaveLength(2);
  });

  it('should show modal onClick delete car and hide on cancel', async () => {
    renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
    await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
    fireEvent.click(screen.getByText('Eliminar'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancelar'));
    await waitForElementToBeRemoved(() => screen.queryByTestId('modal'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  describe('test delete available car', () => {
    it('should show modal with custom message onClick delete', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Eliminar'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-body').textContent).toBe('¿ Seguro de que quieres eliminar este auto ?');
    });

    it('should hide modal and remove car on confirm modal', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Eliminar'));
      fireEvent.click(screen.getByText('Aceptar'));
      await waitForElementToBeRemoved(() => screen.queryByTestId('modal'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('car-card')).not.toBeInTheDocument();
    });
  });

  describe('test delete car when it is not avalaible', () => {
    it('should show modal with custom message onClick delete', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      fireEvent.click(screen.getByText('ver'));
      fireEvent.click(screen.getByText('Alquilados'));
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Eliminar'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-body').textContent).toBe('No puedes eliminar este auto porque esta siendo alquilado');
    });

    it('should hide modal on confirm modal and do not remove the car', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      fireEvent.click(screen.getByText('ver'));
      fireEvent.click(screen.getByText('Alquilados'));
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Eliminar'));
      fireEvent.click(screen.getByText('Aceptar'));
      expect(screen.getByTestId('car-card')).toBeInTheDocument();
      expect(screen.getAllByTestId('car-card')).toHaveLength(1);
    });
  });

  describe('test single car', () => {
    it('should show single car on click car detail', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Ver/Alquilar'));
      expect(screen.getByTestId('single-car-component')).toBeInTheDocument();
    });
  });

  describe('test edit car', () => {
    it('should show modal onClick edit car and hide on cancel button', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Editar'));
      expect(screen.queryByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancelar'));
      await waitForElementToBeRemoved(() => screen.queryByTestId('modal'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('should show form with completed inputs onClick edit car', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Editar'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title').textContent).toBe('Editar auto');
      expect(screen.getByLabelText('Marca').value).toBe('chevrolet');
    });

    it('should show form with empty inputs onClick add new car', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Editar'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title').textContent).toBe('Editar auto');
      expect(screen.getByLabelText('Marca').value).toBe('chevrolet');
    });

    it('should hide modal and modify car when edit car is finished', async () => {
      renderWithRouter(<CarsList BASE_URL={BASE_URL} />);
      await waitForElementToBeRemoved(() => screen.getByText('Cargando'));
      fireEvent.click(screen.getByText('Editar'));
      fireEvent.click(screen.getByText('Finalizar'));
      await waitForElementToBeRemoved(() => screen.queryByTestId('modal'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      await waitFor(() => screen.findByText('ford fiesta'));
      expect(screen.getByTestId('car-title').textContent).toBe('ford fiesta');
    });
  });
});
