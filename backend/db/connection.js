require('dotenv').config()
const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log('Database connected')
}

connect().catch((err) => console.log(err))

module.exports =  mongoose
