const mongoose = require('./utils/db');
const config = require('config'); // configurations
const morgan = require('morgan'); // Logs
const helmet = require('helmet'); // Secuity
const express = require('express');
const app = express();
const genre = require('./routes/genre');

app.use(express.urlencoded());
app.use(express.json())
app.use(helmet());
// NODE_ENV=production for prod
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgon Enabled ...');
}

// It reads from configuration file based on Environment
console.log('App: ' + config.get('name'));
console.log('Mail: ' + config.get('mail.host'));
// Getting app password from environment variables and file name should be custom-environment-variables
console.log('Mail password: ' + config.get('mail.password'));

// Middlewares

app.use('/genres', genre);


app.get('/', (req, res) => {
    res.send("Hello World");
    res.end();
})

mongoose.on('connected', () => {
    console.log('Connected to Database ', process.env.MONGO_DB);
    // only if database is connected then
    // Reading the Port from Env Variables
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    })
})
mongoose.on('error', (err) => {
    console.log("Db Connection error: ", err.message);
})


