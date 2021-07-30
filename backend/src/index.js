const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const db = require('./db');
const db_dump = require('./lib/mysql_backup');
const backup = require('backup');
const chat = require('./routes/index');
const test = require('./routes/api/index');
const products = require('./routes/api/products');
const bodyParser = require('body-parser');
const SocketIO = require('socket.io');
const { globalAgent } = require('http');
const path = require('path');

const app = express();

// Global Variables:
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public/')));

// Middlewares:
//app.use(cors(corsOptions));
app.use(fileupload({debug: true}));
app.use((req, res, next) => {
  console.log(req.protocol.toUpperCase(), req.method.toUpperCase(), req.url);
  next();
});

// Routes:
app.use(test);
app.use(products);
app.use(chat);

// Startup:
const Server = app.listen(app.get('port'), async () => {
    console.log('SERVER ON PORT ', app.get('port'));
    try{
      await db_dump();
      //await backup.backup('/home/kali/Desktop/YouTube/JS/mern', '/home/kali/Desktop/backup.backup');
    }catch(error){
      console.error(error);
    }
});

// Websockets:
const io = SocketIO(Server);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
