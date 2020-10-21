const express = require('express');

// Controllers

// initialization
const server = express();

// settings

server.set('port', 9000);

// middlewares

server.use(express.json());
server.use(express.urlencoded({extended: false}));

module.exports = server;

