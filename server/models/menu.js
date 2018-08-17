var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Menu = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  url: String,
  icon: String,
  deleted: {type: Boolean, default: false}
})

_Menu.plugin(timestamps)
_Menu.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Menu', _Menu)
