const DAOModel = require('./DAOModel');
class CommentaireDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'commentaire';
   }
}

module.exports = CommentaireDAO;
