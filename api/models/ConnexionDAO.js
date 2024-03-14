require('dotenv').config();
const mysql = require('mysql2/promise');
class ConnexionDAO {
  static pool;

  /**
   * ## Création d'un pool de connexion si il n'existe pas
   *
   * @return {Object} Le pool de connexion
   * ---
   * *Exemples :*
   * ```js
   * const pool = ConnexionDAO.createPool();
   * ```
   */
  static createPool() {
    if (!this.pool) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectionLimit: 20,
      });
    }
    
    return this.pool;
  }

  /**
   * ## Connecte à la base de données.
   *
   * @return {Promise<connection>} La connexion à la base de données
   * ---
   * *Exemples :*
   * ```js
   * let connection = await ConnexionDAO.connect();
   * ```
   */
  static async connect() {
    const pool = this.createPool();
    const connection = await pool.getConnection();
    return connection;
  }

  /**
   * ## Déconnection de la base de données
   *
   * @param {object} connection - La connexion à la base de données
   * ---
   * *Exemples :*
   * ```js
   * ConnexionDAO.disconnect(connection);
   * ```
   */
  static disconnect(connection) {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = ConnexionDAO;
