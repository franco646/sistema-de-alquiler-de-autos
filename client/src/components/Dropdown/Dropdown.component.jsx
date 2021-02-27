import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';
import DropdownItem from './DropdownItem/DropdownItem.component';

const dropdown = ({
  title, items, selectedItem, activeItem, className,
}) => (
  <NavDropdown title={title} className={className}>
    {items
      ? items.map((item) => (
        <DropdownItem
          key={Math.random()}
          name={item}
          onSelectedItem={selectedItem}
          active={activeItem}
        />
      ))
      : null }
  </NavDropdown>
);

dropdown.defaultProps = {
  title: '',
  items: [],
  selectedItem: () => {},
  active: null,
};

dropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  selectedItem: PropTypes.func,
  active: PropTypes.string,
};

export default dropdown;
