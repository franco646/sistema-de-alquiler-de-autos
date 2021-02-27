/* eslint-disable */
const inputAlquilerDesde = document.querySelector('#alquilerDesde');
const inputAlquilerHasta = document.querySelector('#alquilerHasta');
const inputFechaDeNacimiento = document.querySelector('#input-fecha-de-nacimiento');

function establecerLimiteFechaHoy(input, limite) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}-${mm}-${dd}`;
  input.setAttribute(limite, today);
}

function calcularDias() {
  const alquilerDesde = document.querySelector('#alquilerDesde').value.split('-');
  const alquilerHasta = document.querySelector('#alquilerHasta').value.split('-');

  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(alquilerDesde[0], alquilerDesde[1], alquilerDesde[2]);
  const secondDate = new Date(alquilerHasta[0], alquilerHasta[1], alquilerHasta[2]);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}

function calcularTotal() {
  const valorUnitario = document.querySelector('#valorPorDia').value;
  const dias = calcularDias() + 1;
  const total = Number(dias * valorUnitario);

  return total;
}

function mostrarTotal() {
  const inputTotal = document.querySelector('#input-total');
  const total = calcularTotal();

  if (total) {
    inputTotal.value = total;
  }
}

function goBack() {
  window.history.back();
}

function enviarFormulario(formulario){
  formulario.submit();
}

function configurarBotones(disponibleBorrar, formulario) {
  const mensajePopUp = document.querySelector('.modal')
  const botonesCancelar = document.querySelectorAll('.cerrar-modal')
  const botonConfirmar = document.querySelector('.confirmar-modal')
  botonesCancelar.forEach(boton => {
    boton.addEventListener('click', () => {
      mensajePopUp.classList.remove('is-active')
    })
  })
  if (disponibleBorrar) {
    botonConfirmar.onclick = () => {
      enviarFormulario(formulario)
    }
  } else {
    console.log('ELSE')
    botonConfirmar.onclick = () => {
      mensajePopUp.classList.remove('is-active')
    }
  }
}

const botonEliminar = document.querySelectorAll('.boton-eliminar');
botonEliminar.forEach((boton) => {
  boton.addEventListener('click', (e) => {
    e.preventDefault()
    setearMensaje(boton, configurarBotones)
    mostrarMensajePopUp()
  })
})

function setearMensaje(boton, callBackConfigurarBotones = () => {}) {
  const mensaje = document.querySelector('#mensaje-modal')
  if(boton.dataset.disponible === 'true') {
    mensaje.textContent = '¿Seguro que quieres eliminar este auto?'
    callBackConfigurarBotones(disponibleBorrar = true, boton.parentElement)
  } else if (boton.dataset.estado === 'Finalizado') {
    mensaje.textContent = 'Al eliminar este alquiler también se borrarán los datos del cliente ¿estás seguro?'
    callBackConfigurarBotones(disponibleBorrar = true, boton.parentElement)
  } else {
    mensaje.textContent = 'No puedes eliminar este auto porque está siendo alquilado'
    callBackConfigurarBotones(disponibleBorrar = false)
  }
}

function mostrarMensajePopUp() {
  const mensajePopUp = document.querySelector('.modal')
  mensajePopUp.classList.add('is-active')
}
