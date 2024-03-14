module.exports = async (req, res, next) => {
   const params = req.body;
   if (params.hasOwnProperty('id_article')) {
      next();
   } else {
      res.status(403).send('Article introuvable');
   }
};
