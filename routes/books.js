const express = require('express');
const router = express.Router();

const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ebooks';

const models = require('../server/models/index');

const isLoggedIn = require('connect-ensure-login').ensureLoggedIn();
router.use(function timeLog (req, res, next) {
  console.log('Access Books Router @Time: ', Date.now())
  // console.log(require('connect-ensure-login').ensureLoggedIn()());
 
  next()
})

/* GET books list. */
router.get('/', (req,res,nxt)=>{
  models.book.findAll({}).then((books)=>{
    res.json(books);
  });
});

/* GET single book. */
router.get('/:id',isLoggedIn, (req, res)=>{
  models.book.findAll({where:{id:req.params.id}}).then((book)=>{
    console.log('###')
    console.log(req.session.passport);
    res.json(book);
  });
});

/* CREATE single book */
router.post('/create', (req,res)=>{
  models.book.create({
    title: req.body.title,
    author: req.body.author,
    path: req.body.path,
    year: req.body.year
  }).then((book)=>{
    res.json(book);
  });
});

/* UPDATE single book */
router.put('/:id', (req,res)=>{
  models.book.find({where:{id: req.params.id}}).then((book)=>{
    if(book){
      tag.updateAttributes({
        title: req.body.title,
        author: req.body.author,
        path: req.body.path,
        year: req.body.year
      }).then((book)=>{
        res.send(book);
      })
    }
  })
});

/* DELETE single book */
router.delete('/:id', (req,res)=>{
  models.book.destroy({
    where: {
      id: req.params.id
    }
  }).then((book)=>{
    res.json(book);
  })
});



module.exports = router;
