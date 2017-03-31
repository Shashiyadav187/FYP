var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    timeStamp : Date,
    user1Id: {type: String, ref: 'User'},
    user2Id: {type: String, ref: 'User'},
    messages: [{type : Schema.Types.Object, ref: 'Message'}]
});

var Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

