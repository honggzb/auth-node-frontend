import express from 'express';
import { routes } from './src/route';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() =>
    console.log(console.log('MongoDb is connected')
  ))
  .catch((err) => console.log(err))

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
//app.use(cors());
app.use(cors({
  origin: ['http:/localhost:3000', 'http:/localhost:4200', 'http:/localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// app.get('/', (req, res) => {
//   res.send("Hello world!")
// });

const port = process.env.PORT || 8888;

routes(app);

app.listen(port, () => {
  console.log('Server running on port ' + port)
})