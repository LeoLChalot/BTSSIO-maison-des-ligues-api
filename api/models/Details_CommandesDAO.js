const DAOModel = require('./DAOModel');
class details_commandesDAO extends DAOModel {
   constructor() {
      super();
      this.table = 'details_commandes';
   }

   async find_and_group(connexion, id_panier) {
      try {
         const query = `
         SELECT 
            dc.*, 
            COUNT(dc.id_article) AS quantite_articles, 
            a.prix AS prix_unite
         FROM panier_produits dc
         JOIN articles a 
         ON dc.id_article = a.id_article
         WHERE dc.id_panier = ?
         GROUP BY dc.id_panier, dc.id_article, a.prix
         ORDER BY dc.id_article ASC`;
         const rows = await connexion.query(query, [id_panier]);
         console.log(rows);
         return rows;
      } catch (error) {
         console.error('Error fetching articles:', error);
         throw error;
      }
   }
}

module.exports = details_commandesDAO;
