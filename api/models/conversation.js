var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    timeStamp : Date,
    user1: {type: Schema.Types.Object, ref: 'User'},
    user2: {type: Schema.Types.Object, ref: 'User'},
    messages: [{type : Schema.Types.Object, ref: 'Message'}],
});

var Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

