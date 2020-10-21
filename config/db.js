const mongoose = require('mongoose');

module.exports = {
  connection: null,
  connect: () => {
    if (this.connection) return this.connection;
    return mongoose.connect('mongodb://localhost/midb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(connection => {
      this.connection = connection;
      console.log('Conexión a db exitosa');
    }).catch(error => console.log(error));
  }
};
