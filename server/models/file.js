var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _File = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  url: String,
  type: String,
})

_File.plugin(timestamps)
_File.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('File', _File)
