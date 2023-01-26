const express = require('express');
const handlebars = require('express-handlebars');
const sesh = require('express-session');
const path = require('path');


const controller = require('./controller');
const handlebar = expresshandlebars.create({ });
// need to create helpers if needed
const helpers = require();

const app = express();
const PORT = process.env.PORT || 3001;