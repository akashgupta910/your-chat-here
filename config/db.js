const mongoose = require('mongoose');

mongoose.connect(require('./key'), { useNewUrlParser: true })
    .then(() => console.log('Connected to the Database...'))
    .catch(err => console.log(`Failed! Not Connected to the Database... ${err}`))