const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

const crypt = require('bcryptjs')

const usersService = require('./users')
const authService = require('./auth')

module.exports = {
    ...usersService(db),
    ...authService(crypt)
}