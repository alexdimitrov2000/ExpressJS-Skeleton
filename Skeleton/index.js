global.__basedir = __dirname;

const databaseConnector = require('./config/database');
databaseConnector().then(() => {
    console.log("HERE")
    const config = require('./config/config');
    const app = require('express')();
    
    require('./config/express')(app);
    require('./config/routes')(app);

    const port = config.port;

    console.log("STARTED");

    app.listen(port, console.log(`Listening on port ${port}!`));
}).catch(console.error);