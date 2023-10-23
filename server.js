require("dotenv").config();
const express = require("express");
const route = require("./routes");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTSTRING)
.then(() =>{
  app.emit("Pronto")
})
.catch((e) => console.log(e))

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
//const helmet = require("helmet");
const csurf = require("csurf");
const { middlewareGlobal, checkCsrfErro, csrfMiddelware } = require("./src/middlewares/middleware");

//app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(express.json());
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csurf());
app.use(middlewareGlobal);
app.use(checkCsrfErro);
app.use(csrfMiddelware);
app.use(route);

app.on("Pronto",() => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("Servidor executando na porta 3000");
  });
})