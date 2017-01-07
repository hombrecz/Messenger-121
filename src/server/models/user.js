let restful = require('node-restful');
let mongoose = restful.mongoose;

let userSchema = mongoose.Schema({
    name: { type:String, unique: true }
});

module.exports = restful.model('Users', userSchema);