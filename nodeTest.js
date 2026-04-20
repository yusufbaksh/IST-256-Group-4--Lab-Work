const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://martinshestani_db_user:Organics888.@cluster0.nwefo1f.mongodb.net/ist256?appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('MongoDB connected!'));