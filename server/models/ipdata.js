const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema

const ipdataSchema = new Schema({
    ip: { type: String, required: 'true'},
    ipdata: { type: String, required: 'true' },
    cachedate: { type: Date, default: Date.now }

},{ collection: 'ipinfo' }); 

// Create Class models
const classModel = mongoose.model('ipdata',ipdataSchema, 'ipinfo');

//Export the class model
module.exports = classModel;