
const Mongoose = require('mongoose')
const {DBCONNECTION} = require('../constants')


module.exports = async function dataBaseConnection(){
	try {
		await Mongoose.connect(DBCONNECTION,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}
	catch (error){
		console.log(error)
	}
	console.log(`----------> Connected to MongoDB`)
}

// const config = require('../config_service_module/config_service')

// const urlConnection = DBCONNECTION //config.dbConnection

// module.exports = function dataBaseConnection(){
//   return Mongoose
//     .connect(urlConnection, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log(`----------> Connected to MongoDB`))
//     .catch((err) => console.log(err))
// }


// module.exports = function dataBaseConnection(){
//   return Mongoose
//     .connect(urlConnection, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log(`----------> Connected to MongoDB`))
//     .catch((err) => console.log(err))
// }