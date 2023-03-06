import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js';
import cors from 'cors'
//App Config
const app = express();
const port = 8001;


// Middlewares
app.use(express.json())
app.use(cors());

// DB Config 
mongoose.connect('mongodb://localhost:27017/tinderDB',{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the Database');
})

// API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// Listener 
app.listen(port, () => {
    console.log('listening at localhost 8001');
})