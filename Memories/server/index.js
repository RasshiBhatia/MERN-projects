
import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true})) //
app.use(bodyParser.urlencoded({limit: '30mb', extended: true})) //
app.use(cors()) //

app.use('/posts', postRoutes);
mongoose.connect('mongodb://localhost:27017/PostMessageDB',{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the Database');
})


app.listen(5000, () => {
    console.log("Port running at 5000") 
})