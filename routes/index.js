const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ebooks';

const models = require('../server/models/index');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/login',
  function(req, res){
    res.render('login');
  });



// router.get('/books', (req,res,nxt)=>{
//   console.log('here')
//   models.book.findAll({}).then((books)=>{
//     res.json(books);
//   });
// });

// router.get('/book/:id', (req, res)=>{
//   console.log('here')
//   models.book.findAll({where:{id:req.params.id}}).then((book)=>{
//     res.json(book);
//   });
// });


// router.post('/bookshelf', (req,res)=>{
//   models.Bookshelf.create({
//     title: req.body.title
//   }).then((bs)=>{
//     res.json(bs);
//   });
// });

// router.post('/tag', (req,res)=>{
//   models.Tag.create({
//     name: req.body.name,
//     color: req.body.color
//   }).then((tag)=>{
//     res.json(tag);
//   });
// });

// router.get('/tags', (req, res)=>{
//   models.Tag.findAll({}).then((tags)=>{
//     res.json(tags);
//   });
// });
// router.get('/tag/:id', (req, res)=>{
//   models.Tag.findAll({where:{id:req.params.id}}).then((tag)=>{
//     res.json(tag);
//   });
// });

// router.put('/tag/:id', (req,res)=>{
//   models.Tag.find({where:{id: req.params.id}}).then((tag)=>{
//     if(tag){
//       tag.updateAttributes({
//         name: req.body.name,
//         color: req.body.color
//       }).then((tag)=>{
//         res.send(tag);
//       })
//     }
//   })
// });

// router.delete('/tag/:id', (req,res)=>{
//   models.Tag.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then((tag)=>{
//     res.json(tag);
//   })
// });

// router.get('/api/v1/books', (req, res, next)=>{
//   const results = [];
//   pg.connect(connectionString, (err, client, done)=>{
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     const query = client.query('SELECT * FROM books ORDER BY id ASC;');
    
//     query.on('row', (row) => {
//       results.push(row);
//     });

//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });

//   });
// });

// router.get('/api/v1/tags', (req, res, next)=>{
//   const results = [];
//   pg.connect(connectionString, (err, client, done)=>{
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     const query = client.query('SELECT * FROM tags ORDER BY id ASC;');
    
//     query.on('row', (row) => {
//       results.push(row);
//     });

//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });

//   });
// });


// router.put('/api/v1/tags/:tag_id', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.todo_id;
//   // Grab data from http request
//   const data = {text: req.body.name, complete: req.body.color};
//   // Get a Postgres client from the connection pool
//   pg.connect(connectionString, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     // SQL Query > Update Data
//     client.query('UPDATE tags SET name=($1), color=($2) WHERE id=($3)',
//     [data.name, data.color, id]);
//     // SQL Query > Select Data
//     const query = client.query("SELECT * FROM tags ORDER BY id ASC");
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//       done();
//       return res.json(results);
//     });
//   });
// });

// router.post('/api/v1/tags', (req, res, next)=>{
//   const results = [];
//   const data = {text: req.body.text, complete: false};

//   pg.connect(connectionString, (err, client, done)=>{
//     if(err){
//       done();
//       console.log(err);
//       return res.status(599).json({success: false, data:err});
//     }
//     client.query('INSERT INTO tags(name,color) values($1,$2)',
//     [data.text,data.complete]);

//     const query = client.query('SELECT * FROM tags ORDER BY id ASC');

//     query.on('row', (row) => {
//       results.push(row);
//     });

//     // After all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });

//   });

// });

// router.delete('/api/v1/tags/:tag_id', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.tag_id;
//   // Get a Postgres client from the connection pool
//   pg.connect(connectionString, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     // SQL Query > Delete Data
//     client.query('DELETE FROM tags WHERE id=($1)', [id]);
//     // SQL Query > Select Data
//     var query = client.query('SELECT * FROM tags ORDER BY id ASC');
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });
//   });
// });

module.exports = router;
