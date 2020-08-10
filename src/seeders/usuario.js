const util = require('../tools/util')

module.exports = () => {
  const DATA = [
    {
      id       : 100,
      username : 'admin',
      password : util.md5('123'),
      nombre   : 'John Smith',
      email    : 'john.smith@gmail.com',
      estado   : 'ACTIVO',
      rol      : 'admin',
    },
  ]

  return DATA
}
