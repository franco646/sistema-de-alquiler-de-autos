/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import Cars from '../../components/Cars/Cars.component';
import ToolsBar from '../../components/ToolsBar/ToolsBar.component';
import Modal from '../../components/Modal/Modal.component';
import SingleCar from './SingleCar/SingleCar';
import LoadMessage from '../../components/LoadMessage/LoadMessage.component';
import Form from '../../components/Form/Form.component';

const CarsList = ({ token, BASE_URL }) => {
  const { path } = useRouteMatch();
  const [cars, setCars] = useState(null);
  const [filter, setFilter] = useState('Disponibles');
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    let isCancelled = false;
    const loadCars = async () => {
      const res = await fetch(`${BASE_URL}/cars`, {
        headers: {
          'auth-token': token,
        },
      });
      const data = await res.json();
      if (!isCancelled) {
        setCars(data.autos);
      }
    };
    loadCars();
    return () => { isCancelled = true; };
  }, []);

  const finishEditHandler = async (postData, image) => {
    let URL = `${BASE_URL}/add-car`;
    if (selectedCar) {
      URL = `${BASE_URL}/edit-car/${selectedCar.id}`;
    }
    const formData = new FormData();
    formData.append('marca', postData.marca);
    formData.append('modelo', postData.modelo);
    formData.append('año', postData.año);
    formData.append('kms', postData.kms);
    formData.append('color', postData.color);
    formData.append('aireAcondicionado', postData.aireAcondicionado);
    formData.append('pasajeros', postData.pasajeros);
    formData.append('manualAutomatico', postData.manualAutomatico);
    formData.append('precioAlquiler', postData.precioAlquilerPorDia);
    formData.append('disponible', postData.disponible);
    if (image) {
      formData.append('imagen', image, image.name);
    }

    const res = await fetch(URL, {
      headers: {
        'auth-token': token,
      },
      method: 'POST',
      body: formData,
    });
    const results = await res.json();
    setCars((prevState) => {
      const updatedCars = [...prevState];
      if (selectedCar) {
        const prevCars = prevState;
        const carIndex = prevCars.findIndex((car) => car.id === selectedCar.id);
        updatedCars[carIndex] = results.auto;
      } else {
        updatedCars.push(results.auto);
      }
      return updatedCars;
    });
  };

  const deleteCarHandler = (carId) => {
    const carToDelete = cars.filter((car) => car.id === carId)[0];
    setSelectedCar(carToDelete);
    setShowModal(true);
    setModalContent({
      aceptButton: true,
      cancelButton: !!carToDelete.disponible,
      title: 'Eliminar auto',
      message: carToDelete.disponible
        ? '¿ Seguro de que quieres eliminar este auto ?'
        : 'No puedes eliminar este auto porque esta siendo alquilado',
    });
  };

  const confirmDeleteCarHandler = async () => {
    if (!selectedCar.disponible) {
      return setShowModal(false);
    }
    await fetch(`${BASE_URL}/delete-car/${selectedCar.id}`, {
      headers: {
        'auth-token': token,
      },
      method: 'DELETE',
    });
    setCars(cars.filter((car) => car.id !== selectedCar.id));
    setSelectedCar(null);
    return setShowModal(false);
  };

  const editCarHandler = (carId) => {
    const carToEdit = cars.filter((car) => car.id === carId)[0];
    setSelectedCar(carToEdit);
  };

  const carDetailHandler = (id) => {
    setSelectedCar(cars.filter((car) => car.id === id)[0]);
  };

  return (
    <div>
      <Modal
        show={showModal}
        content={modalContent}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDeleteCarHandler}
      />
      <Route path={`${path}/edit-car`}>
        <Form
          cars
          onFinishEdit={finishEditHandler}
          selectedCar={selectedCar}
        />
      </Route>

      <Switch>
        <Route path={`${path}/car-detail`}>
          {selectedCar
            ? <SingleCar car={selectedCar} onDelete={deleteCarHandler} />
            : <Redirect to="/cars" />}
        </Route>
        <Route path="/cars">
          <ToolsBar
            button
            dropdownTitle="ver"
            dropdownItems={['Disponibles', 'Alquilados', 'Todos']}
            activeDropdownItem={filter}
            onClickAddCar={() => setSelectedCar(null)}
            onChangeFilter={setFilter}
          />
          {cars
            ? (
              <Cars
                list={cars}
                filter={filter}
                onDetail={carDetailHandler}
                onDelete={deleteCarHandler}
                onEdit={editCarHandler}
              />
            )
            : <LoadMessage /> }
        </Route>
      </Switch>
    </div>
  );
};

export default CarsList;
