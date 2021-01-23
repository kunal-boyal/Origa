//Importing packages
const express = require('express');
const cors = require('cors')

//Initialising packages
const app = express()

//Database connection
require('./db')()

//Importing routes
const routes = require('./routes/route')

const PORT = process.env.PORT || 5000

//Global middlewares
app.use(cors());
app.use(express.json())

app.use(routes)

//Listing to the server
app.listen(PORT, () => {
    console.log('Server started')
})
