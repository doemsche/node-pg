const express = require('express');
const router = express.Router();

const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ebooks';

const models = require('../server/models/index');


router.use(function timeLog (req, res, next) {
  console.log('access Tag Router @Time: ', Date.now())
  next()
})

/* GET tags list. */
router.get('/', (req,res,nxt)=>{
  models.tag.findAll({}).then((tags)=>{
    res.json(tags);
  });
});

/* GET single tag. */
router.get('/:id', (req, res)=>{
  models.tag.findAll({where:{id:req.params.id}}).then((tag)=>{
    res.json(tag);
  });
});

/* CREATE single tag */
router.post('/create', (req,res)=>{
  models.tag.create({
    name: req.body.name,
    color: req.body.color
  }).then((tag)=>{
    res.json(tag);
  });
});

/* UPDATE single tag */
router.put('/:id', (req,res)=>{
  models.tag.find({where:{id: req.params.id}}).then((tag)=>{
    if(tag){
      tag.updateAttributes({
        name: req.body.name,
        color: req.body.color
      }).then((tag)=>{
        res.send(tag);
      })
    }
  })
});

/* DELETE single book */
router.delete('/:id', (req,res)=>{
  models.tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((tag)=>{
    res.json(tag);
  })
});



module.exports = router;
