import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

const dropdownItem = ({ name, active, onSelectedItem }) => (
  <NavDropdown.Item onClick={() => onSelectedItem(name)} className={active === name ? 'active' : ''} data-testid="dropdown-item">
    {name}
  </NavDropdown.Item>
);

export default dropdownItem;
