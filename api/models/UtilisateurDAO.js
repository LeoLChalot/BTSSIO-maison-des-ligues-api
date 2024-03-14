const DAOModel = require('./DAOModel');
class UtilisateurDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'utilisateurs';
   }
}

module.exports = UtilisateurDAO;
