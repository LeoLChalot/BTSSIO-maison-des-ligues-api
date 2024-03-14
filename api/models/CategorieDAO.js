const DAOModel = require('./DAOModel');
class CategorieDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'categories';
   }
}

module.exports = CategorieDAO;
