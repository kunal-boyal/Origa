const mongoose = require('mongoose')

//Connecting with the database
module.exports = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/origa",
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        console.log("Data Base Connected")
    } catch (error) {
        console.log(error.message)
    }
}
