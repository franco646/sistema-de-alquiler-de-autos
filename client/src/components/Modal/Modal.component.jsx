import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const modal = (props) => (
  <Modal
    data-testid="modal"
    show={props.show}
    onHide={props.onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title data-testid="modal-title">
        {props.content.title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body data-testid="modal-body">
      {props.children || props.content.message}
    </Modal.Body>
    {props.content.aceptButton || props.content.cancelButton
      ? (
        <Modal.Footer>
          {props.content.aceptButton
            ? <Button onClick={props.onConfirm}>Aceptar</Button>
            : null}
          {props.content.cancelButton
            ? <Button variant="danger" onClick={props.onHide}>Cancelar</Button>
            : null}
        </Modal.Footer>
      )
      : null }
  </Modal>
);

modal.defaultProps = {
  content: {
    message: '',
    title: '',
    aceptButton: false,
    cancelButton: false,
  },
};

export default modal;
