var express = require('express')
var router = express.Router()
var File = require('../models/file')

router.post('/add', function(req, res) {
  const desc = req.body.desc
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: 'title is empty' })
    return
  }
  const url = req.body.url
  if (!url) {
    res.json({ error_code: 1, msg: 'url is empty' })
    return
  }
  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }

  var file = new File({
    title: title,
    desc: desc,
    url: url,
    type: type
  })
  file.save().then(function(doc){
      console.log('------file saved---------')
      console.log(doc)
      res.json({ error_code: 0, msg: 'success', doc:doc })
  }).catch(function(err){
      // want to handle errors here
      res.json({ error_code: 1, msg: 'save file failed!' })
  });
  
})

router.post('/update', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  const desc = req.body.desc
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: 'title is empty' })
    return
  }
  const url = req.body.url
  if (!url) {
    res.json({ error_code: 1, msg: 'url is empty' })
    return
  }
  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }


  File.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    url: url,
    type: type
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query file failed', data: {}})
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
  var type = req.body.type
  if (typeof type != "undefined" && type != null ) {
    query.type = type
  }
  
  File.paginate(query, { sort: {sort: 'desc'}, page: page, limit: limit }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query file failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  File.findOne({ _id: id }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one file failed', item: {}})
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

  File.findOneAndUpdate({ _id: id }, {
    deleted: deleted,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'change show status of file failed'})
    }
  })
})

module.exports = router
