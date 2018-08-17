var express = require('express')
var router = express.Router()
var Menu = require('../models/menu')

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
  const icon = req.body.icon
  if (!icon) {
    res.json({ error_code: 1, msg: 'icon is empty' })
    return
  }

  var menu = new Menu({
    title: title,
    desc: desc,
    url: url,
    icon: icon
  })
  menu.save().then(function(doc){
      console.log('------menu saved---------')
      console.log(doc)
      res.json({ error_code: 0, msg: 'success', doc:doc })
  }).catch(function(err){
      // want to handle errors here
      res.json({ error_code: 1, msg: 'save menu failed!' })
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
  const icon = req.body.icon
  if (!icon) {
    res.json({ error_code: 1, msg: 'icon is empty' })
    return
  }


  Menu.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    url: url,
    icon: icon
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query menu failed', data: {}})
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

  var query = {deleted: false}
  Menu.paginate(query, {page: page, limit: limit }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query menu failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  Menu.findOne({ _id: id }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one menu failed', item: {}})
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

  Menu.findOneAndUpdate({ _id: id }, {
    deleted: deleted,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'change show status of menu failed'})
    }
  })
})

module.exports = router
