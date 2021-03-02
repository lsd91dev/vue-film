const express = require('express');
const app = express();
const path = require('path');
const connectToDB = require('./config/database.config');

module.exports = { app, express }

require('./config/config');
connectToDB();

app.use(express.static(path.join(__dirname, 'public')))

app.use('/vfilm/home', require('./router/home.routes'));
app.use('/vfilm/user', require('./router/user.routes'));
app.use('/vfilm/login', require('./router/login.routes'));
app.use('/vfilm/register', require('./router/register.routes'));
app.use('/vfilm/movie', require('./router/movie.routes'));
app.use('/vfilm/search', require('./router/search.routes'));
app.use('/vfilm/review', require('./router/review.routes'));

app.listen(process.env.PORT, (error) => {
    if (error) { console.log(error); }
    console.log('server up');
})