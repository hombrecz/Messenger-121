let restful = require('node-restful');
let mongoose = restful.mongoose;

let threadSchema = mongoose.Schema({
    name: { type:String, unique: true },
    messages: [{
        from : String,
        time : Date,
        content : String
    }]
});

module.exports = restful.model('Threads', threadSchema);