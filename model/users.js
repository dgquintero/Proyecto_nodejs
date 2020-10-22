const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// encriptar password
UsersSchema.methods.encryptPassword = async password => {
  return await bycrypt.hash(password, 12);
};

// desencriptar password y comparar con el password en bd
UsersSchema.methods.matchPassword = async function (password) {
  return await bycrypt.compare(password, this.password);
}

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
