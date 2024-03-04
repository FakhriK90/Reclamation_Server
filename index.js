const express = require('express');
const app = express();
const port = 8000

app.use(express.json());
require('dotenv').config();
const reclDb = require('./DB/recl');

reclDb();

app.use('/admin', require('./Routes/authAdmin'));
app.use('/reclamation', require('./Routes/recRoutes'));
app.listen(port, (error) => error ?console.log(error):console.log(`Server listening on port ${port}!`))