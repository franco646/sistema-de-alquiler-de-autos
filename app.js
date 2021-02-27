const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();

const User = require('./models/user');
const Auto = require('./models/auto');
const Cliente = require('./models/cliente');
const Rental = require('./models/rental');

User.hasMany(Rental);
Rental.belongsTo(User);
Cliente.hasOne(Rental);
Rental.belongsTo(Cliente);
Auto.hasMany(Rental);
Rental.belongsTo(Auto);

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, auth-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/img');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

app.use(multer({ storage }).single('imagen'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const crudAutosRoutes = require('./routes/crud-autos');
const clientsRoutes = require('./routes/clients');

app.use(authRoutes);
app.use(crudAutosRoutes);
app.use(clientsRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  const statusError = err.statusCode || 500;
  const mensaje = err.mesaje;
  res.status(statusError).json({ mensaje });
});

app.listen(port);
