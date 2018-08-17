var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Category = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  useUrl: {type: Boolean, default: false},
  icon: String,
  sort: { type: Number, default: 1 },
  image: String,
  url: String,
  deleted: {type: Boolean, default: false}
})

_Category.plugin(timestamps)
_Category.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Category', _Category)
