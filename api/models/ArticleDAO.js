const DAOModel = require('./DAOModel');
class ArticleDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'articles';
   }
}

module.exports = ArticleDAO;
