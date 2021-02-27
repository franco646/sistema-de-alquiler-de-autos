export const required = (value) => {
  if (!value) {
    return 'Por favor complete este campo';
  }
  return null;
};

export const noValidate = () => null;

export const number = (config) => (value) => {
  if (value < config.min) {
    return 'Este numero no cumple con el valor minimo';
  }
  if (value > config.max) {
    return 'Este numero supera el valor maximo';
  }
  return null;
};

export const length = (config) => (value) => {
  if (typeof value === 'number') {
    return null;
  }
  if (value.length < config.min) {
    return 'Este campo no cumple con el minimo de caracteres permitido';
  }
  if (value.length > config.max) {
    return 'Este campo supera el maximo de caracteres permitido';
  }
  return null;
};
