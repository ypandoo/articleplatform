var express = require('express')
var router = express.Router()
var Merchant = require('../models/merchant')

router.post('/add', function(req, res) {
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: '商户名不能为空' })
    return
  }

  const desc = req.body.desc
  if (!desc) {
    res.json({ error_code: 1, msg: 'desc is empty' })
    return
  }

  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }

  const typename = req.body.typename

  const tel = req.body.tel
  if (!tel) {
    res.json({ error_code: 1, msg: '电话不能为空' })
    return
  }

  const latitude = req.body.latitude
  if (!latitude) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  const longtitude = req.body.longtitude
  if (!longtitude) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  location = {
    type: 'Point',
    coordinates: [ parseFloat(longtitude), parseFloat(latitude) ]
  }

  const location_desc = req.body.location_desc
  if (!location_desc) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  const image = req.body.image
  if (!image) {
    res.json({ error_code: 1, msg: '封面图片不能为空' })
    return
  }
  const image_list  = req.body.image_list

  var merchant = new Merchant({
    title: title,
    desc: desc,
    type: type,
    typename: typename,
    image_list : image_list,
    tel: tel,
    image: image,
    location: location,
    location_desc: location_desc
  })
  merchant.save(function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'save merchant failed', data: {}})
    }
  })
  //res.json({ error_code: 0, msg: 'success' })
})

router.post('/update', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: '商户名不能为空' })
    return
  }

  const desc = req.body.desc
  if (!desc) {
    res.json({ error_code: 1, msg: 'desc is empty' })
    return
  }

  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }

  const typename = req.body.typename

  const latitude = req.body.latitude
  if (!latitude) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  const longtitude = req.body.longtitude
  if (!longtitude) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  location = {
    type: 'Point',
    coordinates: [ parseFloat(longtitude), parseFloat(latitude) ]
  }

  const location_desc = req.body.location_desc
  if (!location_desc) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  const tel = req.body.tel
  if (!tel) {
    res.json({ error_code: 1, msg: '电话不能为空' })
    return
  }

  const image = req.body.image
  if (!image) {
    res.json({ error_code: 1, msg: '封面图片不能为空' })
    return
  }
  const image_list  = req.body.image_list

  Merchant.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    type: type,
    typename: typename,
    image_list : image_list,
    tel: tel,
    image: image,
    location: location,
    location_desc: location_desc
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query merchant failed', data: {}})
    }
  })
})

router.post('/list', function(req, res) {
  var limit = req.body.limit
  if (!limit) {
    limit = 20
  }
  var page = req.body.page
  if (!page) {
    page = 1
  }

  var type = req.body.type
  var query = {deleted: false};
  if(typeof type != 'undefined' && type != ""){
    Object.assign(query, {type: type});
  }

  var options = {
    page: page, 
    limit: limit,
  };

  Merchant.paginate(query, options, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query merchant failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  Merchant.findOne({ _id: id }).populate('file_list').exec(function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one merchant failed', item: {}})
    }
  })
})


router.post('/nearby', function(req, res) {
  var limit = req.body.limit
  if (!limit) {
    limit = 20
  }
  var page = req.body.page
  if (!page) {
    page = 1
  }

  var type = req.body.type
  var query = {deleted: false};
  if(typeof type != 'undefined' && type != ""){
    Object.assign(query, {type: type});
  }
  const latitude = req.body.latitude
  if (!latitude) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }

  const longtitude = req.body.longtitude
  if (!longtitude) {
    res.json({ error_code: 1, msg: '位置不能为空' })
    return
  }


  coordinates = [ parseFloat(longtitude), parseFloat(latitude) ]

  query.location = { 
    $nearSphere: coordinates,
    $maxDistance: 0.01
  }

  var options = {
    page: page, 
    limit: limit,
  };

  Merchant.paginate(query, options, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query merchant failed', data: {}})
    }
  })
})


router.post('/delete', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  Merchant.findOneAndUpdate({ _id: id }, {
    deleted: true,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'delete merchant failed', data: {}})
    }
  })
})

module.exports = router
