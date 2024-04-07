/**
 * @class DAOModel - Classe de base pour tous les modeles.
 * @property {string} table - La table de la base de données.
 * @method find_all(connexion) - Retourne toutes les lignes de la table.
 * @method find(connexion, object) - Retourne tous les items correspondant à la recherche.
 * @method create(connexion, object) - Ajoute un nouvel item dans la base de données.
 * @method delete(connexion, object) - Supprime un item dans la base de données.
 * @method update(connexion, object) - Met à jour un item dans la base de données.
 * @method deleteAll(connexion) - Supprime tous les items de la table.
 */
class DAOModel {
   constructor() {}
   /**
    * ## Retourne toutes les lignes de la table.
    * ---
    * @param {Object} connexion - L'objet de connexion.
    * @return {Array} Un tableau d'objets.
    *
    * ---
    * *Exemples :*
    * ```js
    * const model = new DAOModel();
    * model.find_all(connexion);
    * ```
    */
   async find_all(connexion) {
      try {
         const query = `
        SELECT * 
        FROM ${this.table} 
        `;
        return await connexion.query(query);
      } catch (error) {
         console.error('Error fetching articles:', error);
         throw error;
      }
   }

   /**
    * ## Retourne tous les items correspondant à la recherche.
    * ---
    * @param {Object} connexion - L'objet de connexion.
    * @param {Object} object - L'objet contenant les colonnes et les valeurs de recherche.
    * @return {Promise} Une promesse qui contient le résultat de la requête.
    * ---
    * *Exemples :*
    * ```js
    * const object = {id: 1}
    * const model = new DAOModel();
    * model.find(connexion, object);
    * ```
    */
   async find(connexion, object) {
      const columns = Object.keys(object);
      const values = Object.values(object);

      console.log({columns, values});
      try {
         let query = '';
         if (columns.length > 1 && values.length > 1) {
            query = `SELECT * FROM ${this.table} WHERE `;
            for (let i = 0; i < columns.length - 1; i++) {
               if (i < columns.length - 2) {
                  query += `${columns[i]} = ?, `;
               } else {
                  query += `AND ${columns[i]} = ? `;
               }
            }
         } else {
            query = `SELECT * FROM ${this.table} WHERE ${columns[0]} = ?`;
         }
         return await connexion.query(query, values);
      } catch (error) {
         console.error('Error deleting article:', error);
         throw error;
      }
   }

   /**
    * ## Ajouter un nouvel item dans la base de données.
    * ---
    * Permet d'ajouter un nouvel item dans la table correspondante à l'objet.
    *
    * @param {Object} connexion - L'objet de connexion.
    * @param {Object} object - L'objet contenant les colonnes et les valeurs de l'item à ajouter.
    * @return {Promise} Une promesse qui contient le résultat de la requête.
    *
    * Le résultat renvoyé est toujours `true` si l'insertion est réussie, et `false` si elle échoue.
    *
    * @example
    * const object = { id: 1, column_1: value_1, column_2: value_2 }
    * const model = new DAOModel();
    * model.create(connexion, object);
    */
   async create(connexion, object) {
      try {
         const columns = Object.keys(object);
         const values = Object.values(object);

         let query = `INSERT INTO ${this.table} (`;
         for (let i = 0; i < columns.length; i++) {
            if (i < columns.length - 1) {
               query += `${columns[i]}, `;
            } else {
               query += `${columns[i]}) VALUES(`;
            }
         }
         for (let i = 0; i < values.length; i++) {
            if (i < values.length - 1) {
               query += `?, `;
            } else {
               query += `?)`;
            }
         }

         const result = await connexion.query(query, values);
         return true
      } catch (error) {
         console.error('Error adding article:', error);
         return false;
      }
   }

   /**
    * ## Mettre à jour une ligne dans la base de données.
    * ---
    * Permet de mettre à jour une ou plusieurs colonnes d'une ligne
    * correspondant à l'objet passé en paramètre.
    *
    * @param {Object} connexion - L'objet de connexion.
    * @param {Object} object - L'objet contenant les colonnes et les
    * nouvelles valeurs à mettre à jour.
    * @return {Promise} Une promesse qui contient le résultat de la
    * requête.
    *
    * Le résultat renvoyé est toujours `true` si la mise à jour est réussie,
    * et `false` si elle échoue.
    *
    * @example
    * const object = { column_3: new_value_3, column_8: new_value_8, id: 1 }
    * const model = new DAOModel();
    * model.update(connexion, object);
    *
    */
   async update(connexion, object) {
      try {
         const columns = Object.keys(object);
         const values = Object.values(object);

         console.log({columns, values});

         let query = `UPDATE ${this.table} SET `;
         for (let i = 0; i < columns.length - 1; i++) {
            console.log(`${columns[i]} = ${values[i]}`);
            if (i < columns.length - 2) {
               console.log(`[COLUMN.LENGTH - ${i}] ${columns[i]} = ${values[i]}`);
               query += `${columns[i]} = ?, `;
            } else {
               console.log(`[COLUMN.LENGTH - ${i}] ${columns[i]} = ${values[i]}`);
               query += `${columns[columns.length - 2]} = ? `;
            }
         }
         console.log(`[COLUMN.LENGTH - ${columns.length - 1}] ${columns[columns.length - 1]} = ${values[columns.length - 1]}`);
         query += `WHERE ${columns[columns.length - 1]} = ?`;

         console.log({ "QUERY": query, "VALUES": values });

         const result = await connexion.query(query, values);
         return true;
      } catch (error) {
         console.error('Error updating article:', error);
         return false;
      }
   }


   /**
    * ## Supprimer un item dans la base de données.
    *
    * @param {Object} connexion - L'objet de connexion.
    * @param {Object} object - L'objet contenant les colonnes et les
    *  valeurs à supprimer.
    * @return {Promise} Une promesse qui contient le résultat de la
    * requête.
    *
    * Le résultat renvoyé est toujours `true` si la mise à jour est réussie,
    * et `false` si elle échoue.
    *
    * ---
    * *Exemples : Avec une seule colonne*
    * ```js
    * const object = { id: 1 }
    * // Delete From 'table'
    * // Where 'id' = 1
    * const model = new DAOModel();
    * model.delete(connexion, object);
    * ```
    * ---
    * *Exemples : Avec plusieurs colonne*
    * ```js
    * const object = { id: 1, col_1: val_1, col_2: val_2 }
    * // Delete From 'table'
    * // Where 'id' = 1
    * // AND 'col_1' = val_1
    * const model = new DAOModel();
    * model.delete(connexion, object);
    * ```
    */
   async delete(connexion, object) {
      try {
         const columns = Object.keys(object);
         const values = Object.values(object);
         let query = '';
         if (columns.length > 1 && values.length > 1) {
            query = `DELETE FROM ${this.table} WHERE `;
            for (let i = 0; i < columns.length; i++) {
               if (i < columns.length - 2) {
                  query += `${columns[i]} = ?, `;
               } else if (i === columns.length - 2) {
                  query += `${columns[i]} = ? `;
               } else {
                  query += `AND ${columns[i]} = ? LIMIT 1`;
               }
            }
         } else {
            query = `DELETE FROM ${this.table} WHERE ${columns} = ?`;
         }
         const result = await connexion.query(query, values);
         return true
      } catch (error) {
         console.error('Error deleting article:', error);
         return false
      }
   }

   /**
    * Supprimer tous les items de la table.
    *
    * @param {Object} connexion -   L'objet de connexion.
    * @return {Promise} Résultat de la requête.
    * ---
    * *Exemples :*
    * ```js
    * const model = new DAOModel();
    * model.deleteAll(connexion);
    * ```
    */
   async deleteAll(connexion) {
      try {
         const query = `
        DELETE FROM ${this.table}
        `;
         const result = await connexion.query(query);
         console.log(result);
         return true
      } catch (error) {
         console.error('Error deleting article:', error);
         return false
      }
   }
}

module.exports = DAOModel;
