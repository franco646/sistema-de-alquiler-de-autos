/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom';
import Rentals from '../../components/Rentals/Rentals.component';
import Form from '../../components/Form/Form.component';
import ToolsBar from '../../components/ToolsBar/ToolsBar.component';
import Modal from '../../components/Modal/Modal.component';
import { useAuth } from '../../contexts/auth-context';
import SingleClient from './SingleClient/SingleClient';
import LoadMessage from '../../components/LoadMessage/LoadMessage.component';

const RentalsList = ({ token, BASE_URL }) => {
  const { path } = useRouteMatch();
  const auth = useAuth();

  const [rentals, setRentals] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [filter, setFilter] = useState('Alquilados');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    let isCancelled = false;
    const loadRentals = async () => {
      const res = await fetch(`${BASE_URL}/rentals`, {
        headers: {
          'auth-token': token,
        },
      });
      const results = await res.json();
      if (!isCancelled) {
        setRentals(results.alquileres);
      }
    };
    loadRentals();
    return () => { isCancelled = true; };
  }, []);

  const finishEditHandler = async (postData, carId) => {
    const res = await fetch(`${BASE_URL}/add-rental`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        ...postData,
        userId: auth.user.id,
        carId,
      }),
    });
    const results = await res.json();
    setRentals((prevState) => {
      const updatedRentals = [...prevState];
      updatedRentals.push(results.rental);
      return updatedRentals;
    });
  };

  const finishRentalHandler = async (rentalId) => {
    await fetch(`${BASE_URL}/return-car/${rentalId}`, {
      headers: {
        'auth-token': token,
      },
      method: 'POST',
    });
    setRentals((prevState) => {
      const rentalIndex = prevState.findIndex((rental) => rental.id === rentalId);
      const updatedRentals = [...prevState];
      updatedRentals[rentalIndex].estado = 'Finalizado';
      return updatedRentals;
    });
  };

  const deleteRentalHandler = (rental) => {
    const rentalToDelete = rental;
    setSelectedRental(rentalToDelete);
    setShowModal(true);
    setModalContent({
      aceptButton: true,
      cancelButton: rentalToDelete.estado === 'Finalizado',
      title: 'Eliminar alquiler',
      message: rentalToDelete.estado === 'Finalizado'
        ? 'Al eliminar este alquiler tambien se borraran los datos del cliente ¿ Estas seguro ?'
        : 'No puedes eliminar este alquiler porque todavia no fue finalizado',
    });
  };

  const confirmDeleteRentalHandler = async () => {
    if (selectedRental.estado === 'Alquilado') {
      return setShowModal(false);
    }
    await fetch(`${BASE_URL}/delete-rental/${selectedRental.id}`, {
      headers: {
        'auth-token': token,
      },
      method: 'DELETE',
    });
    setRentals((prevState) => {
      const updatedRentals = prevState.filter((rental) => rental.id !== selectedRental.id);
      return updatedRentals;
    });
    setSelectedRental(null);
    return setShowModal(false);
  };

  const downloadPFDHandler = async (rentalId) => {
    const res = await fetch(`${BASE_URL}/download-rental-pdf/${rentalId}`, {
      headers: {
        'auth-token': token,
      },
    });
    const blob = await res.blob();
    const newBlob = new Blob([blob], { type: 'application/pdf' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;
    link.download = 'alquiler.pdf';
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  };

  return (
    <div>

      <Modal
        show={showModal}
        content={modalContent}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDeleteRentalHandler}
      />
      <Route path={`${path}/edit-rental/:carId`}>
        <Form rentals onFinishEdit={finishEditHandler} />
      </Route>
      <Switch>
        <Route path={`${path}/client-detail`}>
          {selectedClient
            ? <SingleClient client={selectedClient} />
            : null }
        </Route>
        <Route path={path}>
          <ToolsBar
            dropdownTitle="ver"
            dropdownItems={['Alquilados', 'Finalizados', 'Todos']}
            activeDropdownItem={filter}
            onChangeFilter={setFilter}
          />
          {rentals
            ? (
              <Rentals
                filter={filter}
                list={rentals}
                onDownloadPDF={downloadPFDHandler}
                onClientDetail={setSelectedClient}
                onFinishRental={finishRentalHandler}
                onDeleteRental={deleteRentalHandler}
              />
            )
            : <LoadMessage /> }
        </Route>
      </Switch>
    </div>
  );
};

export default RentalsList;
