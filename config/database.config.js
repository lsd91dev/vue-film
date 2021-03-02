const mongoose = require('mongoose');

const connectToDB = async() => {
    await mongoose.connect(process.env.URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports = connectToDB;