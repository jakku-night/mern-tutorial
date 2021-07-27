const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const db = require('./db');
const db_dump = require('./lib/mysql_backup');
const backup = require('backup');
const test = require('./routes/api/index');
const products = require('./routes/api/products');

const app = express();

// Global Variables:
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

// Middlewares:
app.use(cors(corsOptions));
app.use(fileupload());
app.use((req, res, next) => {
  console.log(req.protocol.toUpperCase(), req.method.toUpperCase(), req.url, req.headers, req.body);
  next();
});

// Routes:
app.use(test);
app.use(products);

// Startup:
app.listen(app.get('port'), async () => {
    console.log('SERVER ON PORT ', app.get('port'));
    try{
      await db_dump();
      //await backup.backup('/home/kali/Desktop/YouTube/JS/mern', '/home/kali/Desktop/backup.backup');
    }catch(error){
      console.error(error);
    }

});
