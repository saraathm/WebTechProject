/*require('dotenv').config();

const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/routes/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

//connect to DB
connectDB();


app.use(express.static(path.join(__dirname, 'public')));


//Templating Engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout','./layouts/main' );
app.set('views',path.join(__dirname, 'views'));


//const layoutPath = './layouts/main';
//app.set('layout', layoutPath);


//const viewsPath = path.join(__dirname, 'views');
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', viewsPath);

//Routen

//const mainRoutes = 
const mainRoutes = require('./server/routes/main'); 

app.use('/',mainRoutes);


app.listen(PORT, ()=> {
    console.log('App listening on port ${PORT}');
});

//require('dotenv').config();

*/

require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/routes/config/db');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5001;  // Korrigiere die PORT-Variable

// Verbinde zur Datenbank
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Templating Engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, 'views'));

 //Routen
const postRoutes = require('./server/routes/postRoutes'); // Importiere den Router für CRUD-Operationen
const adminRoutes = require('./server/routes/adminRoutes');
const subscribeRoutes = require('./server/routes/subscribeRoutes');
const photoRoutes = require('./server/routes/photoRoutes');

app.use('/', postRoutes); 

//app.use('/', postRoutes); // Verwende den importierten Router

app.use('/admin', adminRoutes);
app.use('/', subscribeRoutes);
app.use('/', photoRoutes);

app.get('/about', (req, res) => {
  const images = [
      { src: '/img/FashionInBerlin.jpg', alt: 'Fashion in Berlin' },
      { src: '/img/csm__EB_4911_Zyn5oRFQ_20220906052058_327e7d288d.jpg', alt: 'Berlin Fashion Week' },
      { src: '/img/11-Berlin-AW20-vgn-150120-credit-Soren-Jepsen.webp', alt: 'Street Style in Berlin' }
  ];
  res.render('about', { images });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;
  // Process the message, e.g., save it to a database or send an email
  console.log(`Message from ${name} (${email}): ${message}`);
  res.redirect('/contact');
});

const styleTips = [
  {
      title: "Embrace the Street Style",
      description: "Berlin's street style is all about individuality and creativity. Mix and match bold prints with vintage finds to create a unique look.",
      image: "/img/printVintage.webp"
  },
  {
      title: "Minimalist Elegance",
      description: "Opt for minimalist designs and neutral colors. Berliners love a sleek, understated look that is both chic and comfortable.",
      image: "/img/minimal1.jpg"
  },
  {
      title: "Layering Like a Pro",
      description: "Layering is key in Berlin's unpredictable weather. Combine different textures and lengths to stay warm and stylish.",
      image: "/img/layering_art2.webp"
  }
];

// Route to render the style tips page
app.get('/style-tips', (req, res) => {
  res.render('fashion/style-tips', { styleTips });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
