var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Param = new Schema({
  id: Schema.Types.ObjectId,
  key: String,
  value: String,
})

_Param.plugin(timestamps)
_Param.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Param', _Param)
