import mongoose from 'mongoose';
import env from './envHandler';

const dburl = env().dbUrl;

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', () => {
    console.log('error while communicating to database ');
});

export default {
    openConnection,
    closeConnection
};

function openConnection() {
    return mongoose.connect(dburl, { useMongoClient: true });
}

function closeConnection(callback) {
    db.close().then(() => {
        console.log('db disconnected');
        callback();
    });
}