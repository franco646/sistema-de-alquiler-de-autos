/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  useHistory,
} from 'react-router-dom';
import Modal from '../Modal/Modal.component';
import CarForm from '../Form/CarForm/CarForm.component';

const Edit = ({
  onFinishEdit, data,
}) => {
  const history = useHistory();
  return (
    <div>
      <Modal show title={data ? 'Editar auto' : 'Agregar auto'} onHide={() => history.goBack()}>
        <Route path="/cars/edit-car">
          <CarForm
            hideModal={() => history.goBack()}
            onFinishEdit={onFinishEdit}
            carData={data}
          />
        </Route>
      </Modal>
    </div>
  );
};

Edit.defaultProps = {
  data: null,
};

Edit.propTypes = {
  // editing: PropTypes.bool.isRequired,
  // title: PropTypes.string.isRequired,
  // onHide: PropTypes.func.isRequired,
  onFinishEdit: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
  // formToShow: PropTypes.string.isRequired,
};

export default Edit;
