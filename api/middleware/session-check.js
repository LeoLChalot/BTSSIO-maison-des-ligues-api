sessionChecker = (req, res, next) => {    
    // On vient vérifier si la session existe 
    if (req.session) {
        console.log(`Session found ! Proceed`);
        // Si c'est bon on passe au middleware suivant
        next();
    } else {
        // Sinon on redirige vers la page de login 
        console.log(`No User Session Found`);
    }
};

module.exports = sessionChecker;