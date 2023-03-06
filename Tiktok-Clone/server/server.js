import express from 'express'
import mongoose from 'mongoose'
import data from './data.js'
import Videos from './dbModel.js'
const app = express();
const port = 9000;


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
})


mongoose.connect('mongodb://localhost:27017/tiktokDB',{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the Database');
})


app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})



app.get('/v1/posts', (req, res) => {
    res.status(200).send(data);
})

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;
    Videos.create(dbVideos, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.listen(port, () => {
    console.log('listening on localhost 9000');
})