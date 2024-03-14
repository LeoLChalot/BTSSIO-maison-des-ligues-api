const DAOModel = require('./DAOModel');
class Panier_ProduitsDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'panier_produits';
   }

   /**
    * Asynchronously finds and groups items in a shopping cart.
    *
    * @param {Object} connexion - the database connection object
    * @param {number} id_panier - the ID of the shopping cart
    * @return {Array} the rows of items and their quantities and prices
    */
   async find_and_group(connexion, id_panier) {
      try {
         const query = `
         SELECT 
            pp.*, 
            COUNT(pp.id_article) AS quantite_articles, 
            a.prix AS prix_unite
         FROM panier_produits pp
         JOIN articles a 
         ON pp.id_article = a.id_article
         WHERE pp.id_panier = ?
         GROUP BY pp.id_panier, pp.id_article, a.prix
         ORDER BY pp.id_article ASC`;
         console.log({"query": query, "id": id_panier});
         const rows = await connexion.query(query, [id_panier]);
         console.log(rows);
         return rows;
      } catch (error) {
         console.error('Error fetching articles:', error);
         throw error;
      }
   }
}

module.exports = Panier_ProduitsDAO;
