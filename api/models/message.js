var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    timeStamp : Date,
    body: String,
    senderId: {type: String, ref: 'User'},
    receiverId: {type: String, ref: 'User'},
    read: Boolean
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;

