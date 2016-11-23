const express = require('express');
const router = express.Router();

const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ebooks';

const models = require('../server/models/index');

router.use(function timeLog (req, res, next) {
  console.log('Access users Router @Time: ', Date.now())
  next()
})

/* GET users list. */
// router.get('/', (req,res,nxt)=>{
//   models.user.findAll({}).then((users)=>{
//     res.json(users);
//   });
// });

/* GET single user. */
router.get('/:id', (req, res)=>{
  models.user.findAll({where:{id:req.params.id}}).then((user)=>{
    res.json(user);
  });
});

/* CREATE single user */
router.post('/create', (req,res)=>{
  models.user.create({
    username: req.body.username,
    password: req.body.password
  }).then((user)=>{
    res.json(user);
  });
});

/* UPDATE single user */
router.put('/:id', (req,res)=>{
  models.user.find({where:{id: req.params.id}}).then((user)=>{
    if(user){
      user.updateAttributes({
        username: req.body.username,
        password: req.body.password
      }).then((user)=>{
        res.send(user);
      })
    }
  })
});

/* DELETE single user */
router.delete('/:id', (req,res)=>{
  models.user.destroy({
    where: {
      id: req.params.id
    }
  }).then((user)=>{
    res.json(user);
  })
});



module.exports = router;
