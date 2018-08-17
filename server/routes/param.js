var express = require('express')
var router = express.Router()
var Param = require('../models/param')

router.post('/add', function(req, res) {
  const key = req.body.key
  if (!key) {
    res.json({ error_code: 1, msg: 'key is empty' })
    return
  }

  const value = req.body.value
  if (!value) {
    res.json({ error_code: 1, msg: 'value is empty' })
    return
  }

  var param = new Param({
    key: key,
    value: value
  })
  param.save().then(function(doc){
      console.log('------param saved---------')
      console.log(doc)
      res.json({ error_code: 0, msg: 'success', doc:doc })
  }).catch(function(err){
      // want to handle errors here
      res.json({ error_code: 1, msg: 'save param failed!' })
  });
  
})

router.post('/update', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  const key = req.body.key
  if (!key) {
    res.json({ error_code: 1, msg: 'key is empty' })
    return
  }

  const value = req.body.value
  if (!value) {
    res.json({ error_code: 1, msg: 'value is empty' })
    return
  }

  Param.findOneAndUpdate({ _id: id }, {
    key: key,
    value: value
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query param failed', data: {}})
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

  var query = {}
  Param.paginate(query, { page: page, limit: limit }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query param failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const key = req.body.key
  if (!key) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  Param.findOne({ key: key }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one param failed', item: {}})
    }
  })
})

router.post('/delete', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  var deleted = req.body.deleted
  if (!deleted) 
    deleted = false
  else
    deleted = true

  Param.findOneAndUpdate({ _id: id }, {
    deleted: deleted,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'change show status of param failed'})
    }
  })
})

module.exports = router
