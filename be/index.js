require('dotenv').config();
const express = require('express');
const ConnectDB = require('./database/mongodb');
const cors = require('cors')

const app = express()
const port = 5000
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}))
app.use('/', require('./router'))

app.listen(port, async () => {
    await ConnectDB();
  console.log(`Example app listening on port ${port}`)
})
