const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

/* Listening to server */
const server = http.createServer(app);  /* passing app to create a server */
server.listen(port);
