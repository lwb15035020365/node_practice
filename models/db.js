const { Sequelize } = require('sequelize');
const { sqlLogger } = require('../logger')

const sequelize = new Sequelize('node_practice', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => {
    sqlLogger.debug(msg);
  }
});

try {
  sequelize.authenticate();
  console.log('Connection successfully!')
} catch (err) {
  console.error('unable to connect', error);
}

module.exports = sequelize;