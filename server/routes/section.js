var express = require('express')
var router = express.Router()
var Section = require('../models/section')

router.post('/add', function(req, res) {
  const icon = req.body.icon
  if (!icon) {
    res.json({ error_code: 1, msg: 'icon is empty' })
    return
  }
  const desc = req.body.desc
  if (!desc) {
    res.json({ error_code: 1, msg: 'desc is empty' })
    return
  }
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: 'title is empty' })
    return
  }
  const image = req.body.image
  if (!image) {
    res.json({ error_code: 1, msg: 'image is empty' })
    return
  }
  const categories = req.body.categories
  if (!categories) {
    res.json({ error_code: 1, msg: 'categories is empty' })
    return
  }

  var section = new Section({
    title: title,
    desc: desc,
    icon: icon,
    image: image,
    categories: categories
  })
  section.save().then(function(doc){
      console.log('------section saved---------')
      console.log(doc)
      res.json({ error_code: 0, msg: 'success' })
  }).catch(function(err){
      // want to handle errors here
      res.json({ error_code: 1, msg: 'save section failed!' })
  });
  
})

router.post('/update', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  const icon = req.body.icon
  if (!icon) {
    res.json({ error_code: 1, msg: 'icon is empty' })
    return
  }
  const desc = req.body.desc
  if (!desc) {
    res.json({ error_code: 1, msg: 'desc is empty' })
    return
  }
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: 'title is empty' })
    return
  }
  const image = req.body.image
  if (!image) {
    res.json({ error_code: 1, msg: 'image is empty' })
    return
  }
  const categories = req.body.categories
  if (!categories) {
    res.json({ error_code: 1, msg: 'categories is empty' })
    return
  }

  Section.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    icon: icon,
    image: image,
    categories: categories
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query section failed', data: {}})
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
  Section.paginate(query, { sort: {sort: 'desc'}, page: page, limit: limit }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query section failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  Section.findOne({ _id: id }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one section failed', item: {}})
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

  Section.findOneAndUpdate({ _id: id }, {
    deleted: deleted,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'change show status of section failed'})
    }
  })
})

module.exports = router
