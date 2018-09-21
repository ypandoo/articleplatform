var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Merchant = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  location: { type: { type: String }, coordinates: [ ] },
  tel: String,
  location_desc: String,
  image_list: Array,
  image: String,
  deleted: {type: Boolean, default: false},
  type: String,
  typename: String,
})

_Merchant.index({ location: '2dsphere' })
_Merchant.plugin(timestamps)
_Merchant.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Merchant', _Merchant)
