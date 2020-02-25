const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cabSchema = new Schema({
    car:String,
    driverName:String,
    location:String,
    available:String
});

module.exports = mongoose.model('Cab', cabSchema);
