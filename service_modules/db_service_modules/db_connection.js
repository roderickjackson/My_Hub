
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
