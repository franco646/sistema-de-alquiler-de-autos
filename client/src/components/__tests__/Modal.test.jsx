/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from '../Modal/Modal.component';
import '@testing-library/jest-dom/extend-expect';

const content = {
  message: 'test message',
  title: 'test title',
};

describe('<Modal />', () => {
  it('should render modal with custom text', () => {
    render(<Modal show content={content} />);
    expect(screen.getByTestId('modal-title').textContent).toBe('test title');
    expect(screen.getByTestId('modal-body').textContent).toBe('test message');
  });
  it('shold render modal with both buttons', () => {
    render(<Modal show content={{ aceptButton: true, cancelButton: true }} />);
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });
});
