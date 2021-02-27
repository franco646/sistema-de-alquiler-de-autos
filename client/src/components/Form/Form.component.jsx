import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarForm from './CarForm/CarForm.component';
import RentalForm from './RentalForm/RentalForm.component';
import Modal from '../Modal/Modal.component';

const Form = ({
  cars, rentals, onFinishEdit, selectedCar,
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      history.goBack();
    }, 150);
  };

  return (
    <Modal show={showModal} onHide={closeModal} content={{ title: selectedCar ? 'Editar auto' : 'Nuevo auto' }}>
      {cars
        ? <CarForm onHideForm={closeModal} onFinishEdit={onFinishEdit} data={selectedCar} />
        : null}
      {rentals
        ? <RentalForm onHideForm={closeModal} onFinishEdit={onFinishEdit} />
        : null }
    </Modal>
  );
};

Form.defaultProps = {
  cars: false,
  rentals: false,
  selectedCar: null,
  onFinishEdit: () => {},
};

Form.propTypes = {
  cars: PropTypes.bool,
  rentals: PropTypes.bool,
  onFinishEdit: PropTypes.func,
  selectedCar: PropTypes.shape(),
};

export default Form;
