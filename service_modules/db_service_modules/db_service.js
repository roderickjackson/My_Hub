
const Mongoose = require('mongoose')
const config = require('../config_service_module/config_service')

const urlConnection = config.dbConnection

module.exports = function dataBaseConnection(){
  return Mongoose
    .connect(urlConnection, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`----------> Connected to MongoDB`))
    .catch((err) => console.log(err))
}