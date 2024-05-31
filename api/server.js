const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
// const IP_HOME = "192.168.1.30";
// const IP_ECOLE = "192.168.1.35"
// const IP_ECOLE ="192.168.206.199"

const cookieParser = require('cookie-parser');


app.use('/images', express.static(path.join(__dirname, 'images')));

const routesBoutique = require('./routes/boutiqueRoute');
const routesUsers = require('./routes/usersRoute');
const routesAdmin = require('./routes/adminRoute');
const routesPanier = require('./routes/panierRoute');

app.use(
   cookieParser(null, {
      sameSite: 'None',
      secure: false,
   })
);

const whiteList = [
   'http://localhost:5173',
   'http://127.0.0.1:5173',
   'http://192.168.1.34:5173',
   'http://192.168.56.1:5173'
];



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


app.get('/', (req, res) => {
   const ipAddress = req.socket.remoteAddress;
   // const ipAddress = req.header('x-forwarded-for');
   res.status(200).json({ "ipAdress: ": ipAddress });
});

// ? Router inscription / connexion
app.use('/m2l/user', routesUsers);

// ? Router Boutique
app.use('/m2l/boutique', routesBoutique);

// ? Router Admin
app.use('/m2l/admin', routesAdmin);

// ? Router Panier
app.use('/m2l/panier', routesPanier);



module.exports = app.listen(PORT, () => {
   console.log(`Listen on port ${PORT}`);
});
