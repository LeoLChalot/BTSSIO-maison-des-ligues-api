const express = require('express');
const router = express.Router();

const ConnexionDAO = require('../models/ConnexionDAO');

router.get('/', async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();

      res.status(200).json({ 
         success: true 
         
      });
   } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).send('Internal Server Error');
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
});

router.post('/', async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
   } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).send('Internal Server Error');
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
});

router.put('/', async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
   } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).send('Internal Server Error');
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
});

router.delete('/', async (req, res) => {
   let connexion;
   try {
      connexion = await ConnexionDAO.connect();
   } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).send('Internal Server Error');
   } finally {
      if (connexion) {
         ConnexionDAO.disconnect(connexion);
      }
   }
});

module.exports = router;
