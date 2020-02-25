const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    cabId:String,
    userId:String,
    car:String,
    from:String,
    to:String,
    driverName:String,
  
});

module.exports = mongoose.model('Booking', bookingSchema);
