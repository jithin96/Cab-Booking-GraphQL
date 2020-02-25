const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/cab-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})