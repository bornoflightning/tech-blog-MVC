const express = require('express');
const path = require('path');
const session = require('express-session');
const expressHandleBars = require('express-handlebars');



const controllers = require('./controller');
// const handlebars = expresshandlebars.create({ });
// need to create helpers if needed
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// use of port, either local or whatever port heroku deploys
const app = express();
const PORT = process.env.PORT || 3001;

const handlebars = expressHandleBars.create({ helpers });

// session, called sesh for short name and easy to read
const sesh = {
    secret: "keyboard cat",
    cookie: {
        maxAge: 500000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sesh));

// handlebars stuff
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// boiler plate for express, 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// handling static files with images and such
app.use(express.static(path.join(__dirname, "public")));



app.use(controllers);

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`));
});

