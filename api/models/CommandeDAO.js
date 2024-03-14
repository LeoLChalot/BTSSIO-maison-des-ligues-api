const DAOModel = require('./DAOModel');
class CommandesDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'commandes';
   }
}

module.exports = CommandesDAO;
