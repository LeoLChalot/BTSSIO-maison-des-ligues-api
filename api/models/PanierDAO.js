const DAOModel = require('./DAOModel');
class PanierDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'panier';
   }
}

module.exports = PanierDAO;
