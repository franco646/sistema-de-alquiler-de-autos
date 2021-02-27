import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from '../Dropdown/Dropdown.component';
import style from './ToolsBar.module.scss';

const toolsBar = (props) => {
  const { url } = useRouteMatch();
  return (
    <Navbar expand="lg" variant="light" bg="light" className={`${style.toolsBar} shadow-sm p-3 mb-3 bg-white rounded`}>
      <Container>
        <Dropdown
          activeItem={props.activeDropdownItem}
          className={style.dropdown}
          title={props.dropdownTitle}
          items={props.dropdownItems}
          selectedItem={props.onChangeFilter}
        />
        {props.button
          ? (
            <Link to={`${url}/edit-car`}>
              <Button onClick={props.onClickAddCar} variant="danger">
                Agregar auto
              </Button>
            </Link>
          )
          : null }
      </Container>
    </Navbar>
  );
};

toolsBar.defaultProps = {
  button: false,
};

export default toolsBar;
