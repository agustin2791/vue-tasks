var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectTaskSchema = new Schema({
  name: String,
  start: Date,
  end: Date,
  duration: Number,
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  _assignedTo: Schema.Type.ObjectId,
})

var ProjectSchema = new Schema({
  name: String,
  color: String,
  _ownerId: Schema.Type.ObjectId,
  users: [Schema.Type.ObjectId],
  tasks: [ProjectTaskSchema]
})

module.exports = mongoose.model('Project', ProjectSchema);
