const { app, express } = require('../app');

require('dotenv').config();

const cors = require('cors');

app.use(cors());
app.use(express.json());