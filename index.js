const server = require('./server');
const db = require('./config/db');

// Connect to db
db.connect();

// init server
const app = server.listen(server.get('port'), () => {
  console.log('Funcionando ' + app.address().port);
});
