import express, { Express } from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import routes from './routes'

const mongoURI = 'mongodb+srv://root:password1!@cluster0.cagnj.mongodb.net/db_terminter?retryWrites=true&w=majority';
// const mongoURI = 'mongodb://localhost/db_terminter';
mongoose.connect(mongoURI);

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.use(routes)

app.use(express.static(`${__dirname}/build`))

app.use('/*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`)
})


app.listen(process.env.PORT || 5000, () => {
  // tslint:disable-next-line:no-console
  console.log("Server is Runing On port 5000");
});
