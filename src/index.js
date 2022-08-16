const express = require('express')
const morgan = require('morgan');
const path = require('path');

const{ mongoose } = require('./database');

const app = express();

//Configuracion
app.set('port', process.env.PORT || 3000);

//Funcion que se ejecutan antes de las rutas
app.use(morgan('dev'));
app.use(express.json());
//rutas url
app.use('/api/tasks',require('./routes/task.routes'));

//Archivos estaticos

app.use(express.static(path.join(__dirname, '/public')));

//Iniciar servidor

app.listen(app.get('port'), () => {
    console.log (`Server on port ${app.get('port')}`);
});