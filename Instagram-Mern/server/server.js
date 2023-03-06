import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
// import bodyParser from 'body-parser'
import dbModel from './dbModel.js'
const app = express();
const port = 9000;
const pusher = new Pusher({
    appId: '1076983',
    key: '1fee3604216f00d1c52e',
    secret: '0f8ebae868ef659e8262',
    cluster: 'eu',
    useTLS: true,
});


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/instaDB',{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the Database');
    const changeStream = mongoose.connection.collection('posts').watch()
    changeStream.on('change', (change) => {
        console.log('Change Triggered on pusher')
        console.log(change);
        console.log('End of trigger');
        if(change.operationType === 'insert') {
            console.log('Triggering Pusher ***IMG UPLOAD***')
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            })
        } else {
            console.log('Unknown trigger from pusher');
        }
    })

})

app.get('/', (req, res) => {
    res.status(200).send('Hello World'); 
})

app.post('/upload', (req, res) => {
    const post = req.body;
    dbModel.create(post, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})


app.listen(port, () => {
    console.log('listening at port 9000');
})