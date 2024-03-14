const DAOModel = require('./DAOModel');
class Articles_StandbyDAO extends DAOModel {
    constructor() {
        super();
        this.table = 'articles_standby';
    }

    /**
   * Asynchronously finds and groups items in a shopping cart.
   *
   * @param {Object} connexion - the database connection object
   * @param {number} id_panier - the ID of the shopping cart
   * @return {Array} the rows of items and their quantities and prices
   */
    async find_and_group(connexion, id_article) {
        try {
            const query = `
       SELECT 
          *, 
          COUNT(id_article) AS quantite_articles
       FROM articles_standby
       GROUP BY id_article`;
            console.log({ "query": query, "id": id_article });
            const rows = await connexion.query(query, [id_article]);
            console.log({ "rows": rows });
            return rows[0];
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }
}

module.exports = Articles_StandbyDAO;
