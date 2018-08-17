var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Section = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  image: String,
  icon: String,
  deleted: {type: Boolean, default: false},
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
})

_Section.plugin(timestamps)
_Section.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Section', _Section)
