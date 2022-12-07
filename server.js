
// imports
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import messagesApiRoutes from './routes/messages_routes.js';
import Pusher from 'pusher';


// app configs
const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
    appId: "1436865",
    key: "45bad6741ce120f11b02",
    secret: "5f64a7e5c290ec4d6d17",
    cluster: "mt1",
    useTLS: true
});


// middlewares
app.use(express.json());
app.use(cors());

// DB configs
const CONNECTION_URL= 'mongodb+srv://admin:admin123@cluster0.s91fz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL);

const db = mongoose.connection;
db.once('open', () => {
    console.log("DB Connected");

    const messagesCollection = db.collection("chat_messages");
    const changeStream = messagesCollection.watch();

    changeStream.on('change', (change) => {
        // console.log(change);
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages_channel', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        }else{
            console.log('Error Triggering pusher');
        }
    })
});


// API routes
app.get('/', (req, res) => res.status(200).send('hello world'));    //root
app.use('/whatsapp/api/messages', messagesApiRoutes);       // for all messages related api's


// listener
app.listen(port, () => console.log(`Server listening on port: ${port}`));