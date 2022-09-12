var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    host: String,
    start_date: String,
    end_date: String,
    event_categories: [String],
    location: String,
    likes: {type: Number, default: 0},
    remarks: [{type: Schema.Types.ObjectId, ref: "Remark"}]
}, {timestamps: true});

module.exports = mongoose.model('Event', eventSchema);
