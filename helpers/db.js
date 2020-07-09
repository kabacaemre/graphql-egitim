const mongoose = require('mongoose');

const connectDatabase =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser : true,
        useFindAndModify : false,
        useCreateIndex : true,
        useUnifiedTopology : true
    }).then(()=> {
        console.log("MongoDB connected.");
    }).catch(err => {
        console.log(err);
    });
};

module.exports = connectDatabase;