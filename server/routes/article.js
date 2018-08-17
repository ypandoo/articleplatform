var express = require('express')
var router = express.Router()
var Article = require('../models/article')

router.post('/add', function(req, res) {
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
  const content = req.body.content
  if (!content) {
    res.json({ error_code: 1, msg: 'content is empty' })
    return
  }
  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }
  const publish_date = req.body.publish_date
  if (!publish_date) {
    res.json({ error_code: 1, msg: 'publish_date is empty' })
    return
  }

  const author = req.body.author
  if (!author) {
    res.json({ error_code: 1, msg: '作者不能为空' })
    return
  }

  const image = req.body.image
  if (!image) {
    res.json({ error_code: 1, msg: '封面图片不能为空' })
    return
  }

  const image_list  = req.body.image_list
  const file_list  = req.body.file_list

  var article = new Article({
    title: title,
    desc: desc,
    type: type,
    author: author,
    image_list : image_list,
    file_list: file_list,
    publish_date: publish_date,
    image: image,
    content: content
  })
  article.save(function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'save article failed', data: {}})
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
  const content = req.body.content
  if (!content) {
    res.json({ error_code: 1, msg: 'content is empty' })
    return
  }
  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }
  const publish_date = req.body.publish_date
  if (!publish_date) {
    res.json({ error_code: 1, msg: 'publish_date is empty' })
    return
  }

  const author = req.body.author
  if (!author) {
    res.json({ error_code: 1, msg: '作者不能为空' })
    return
  }

  const image = req.body.image
  if (!image) {
    res.json({ error_code: 1, msg: '封面图片不能为空' })
    return
  }

  const image_list  = req.body.image_list
  const file_list  = req.body.file_list

  Article.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    type: type,
    author: author,
    image_list : image_list,
    file_list: file_list,
    publish_date: publish_date,
    image: image,
    content: content
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query article failed', data: {}})
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
    populate: [{path: 'type'}, {path: 'file_list'}],
    page: page, 
    limit: limit,
    sort: {publish_date: 'desc'},
  };

  Article.paginate(query, options, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query article failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  Article.findOne({ _id: id }).populate('file_list').exec(function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one article failed', item: {}})
    }
  })
})

router.post('/delete', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  Article.findOneAndUpdate({ _id: id }, {
    deleted: true,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'delete article failed', data: {}})
    }
  })
})

module.exports = router
