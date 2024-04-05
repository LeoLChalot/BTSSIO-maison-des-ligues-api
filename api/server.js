const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');


app.use('/images', express.static(path.join(__dirname, 'images')));

const routesBoutique = require('./routes/boutiqueRoute');
const routesUsers = require('./routes/usersRoute');
const routesAdmin = require('./routes/adminRoute');
const routesPanier = require('./routes/panierRoute');
const routesTests = require('./routes/testsRoute');

app.use(
   cookieParser(null, {
      sameSite: 'None',
      secure: false,
   })
 );



const whiteList = [
	'http://localhost:3000',
	'http://127.0.0.1:5173',
	'http://192.168.58.199:5173',
	'http://192.168.1.35:3000',
	'http://localhost:52905/',
	'http://localhost:55605/',
	'http://localhost:56976/',
	'http://127.0.0.1:56976/',
	'http://127.0.0.1:55605',
	'http://192.168.1.34:5173',
	'http://localhost:5173',
	'http://localhost:50433',
	'http://localhost:45820',
	'http://127.0.0.1:43336'];


const corsOptions = {
   origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true,
   optionsSuccessStatus: 200,
};

app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions));

/** app.get("/", (req, res) => {
	const root = __dirname;
	res.sendFile(root + "/coucou.html");
})
*/
// ? Router inscription / connexion
app.use('/m2l/user', routesUsers);

// ? Router Boutique
app.use('/m2l/boutique', routesBoutique);

// ? Router Admin
app.use('/m2l/admin', routesAdmin);

// ? Router Panier
app.use('/m2l/panier', routesPanier);

// ? Router Tests
app.use('/m2l/tests', routesTests);

/*
// ? Router Error 400
app.use((req, res, next) => {
   res.status(400).json({ message: 'Bad request' });
});

// ? Router Error 401
app.use((req, res, next) => {
   res.status(401).json({ message: 'Unauthorized' });
});

// ? Router Error 404
app.use((req, res) => {
   res.status(404).json({ message: 'Page not found' });
});

// ? Router Error 500
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: 'Internal server error' });
});
*/
module.exports = app.listen(PORT, () => {
   console.log(`Listen on port ${PORT}`);
});
