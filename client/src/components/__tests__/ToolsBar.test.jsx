/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ToolsBar from '../ToolsBar/ToolsBar.component';
import '@testing-library/jest-dom/extend-expect';

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  ),
});

describe('<ToolsBar />', () => {
  it('should render tools bar with add car button', () => {
    renderWithRouter(<ToolsBar button />);
    expect(screen.getByText('Agregar auto')).toBeInTheDocument();
  });
  it('should render tools bar without add car button', () => {
    renderWithRouter(<ToolsBar />);
    expect(screen.queryByText('Agregar auto')).not.toBeInTheDocument();
  });
});
