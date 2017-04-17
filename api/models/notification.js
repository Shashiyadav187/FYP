var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    timeStamp : Date,
    senderId: {type: String, ref: 'User'},
    receiverId: {type: String, ref: 'User'},
    conversationId: {type: String, ref: 'Conversation'},
    message: String ,
    seen: Boolean
});

var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

