var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remarkSchema = new Schema({
    title: {type: String, required: true},
    author: String,
    likes: {type: Number, default: 0},
    eventId: {type: Schema.Types.ObjectId}
}, {timestamps: true});

module.exports = mongoose.model('Remark', remarkSchema);