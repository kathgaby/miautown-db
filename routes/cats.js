var express = require('express');
var router = express.Router();
var catsDB = require('../db/cats')

router.get('/', function(req, res, next) {
  catsDB.getAllCats()
    .then(function(catsFromDB){
      res.render('cats', { cats: catsFromDB })
    })
    .catch(function(error){
      res.status(500)
      console.log(error);
    })
});

router.get('/new/', function(req, res){
  res.render('newCat')
})

router.get('/:id/', function(req, res){
  catsDB.getCatById(Number(req.params.id))
    .then(function(catsFromDB){
      res.render('showCat', catsFromDB[0])
    })
    .catch(function(error){
      console.log(error);
    })
})

router.get('/edit/:id', function (req, res) {
  catsDB.getCatById(Number(req.params.id))
  .then(function(catsFromDB){
    res.render('editcat', catsFromDB[0])
  })
  .catch(function(error){
    console.log(error);
  })
})

router.post('/:id', function(req, res){
  var editedCat = {
    id: req.params.id,
    name: req.body.name,
    url: req.body.image,
    story: req.body.life_story
  }
  catsDB.updateCat(editedCat)
    .then(function(editedCat){
      console.log("the editedCat is:", editedCat)
    })
    .catch(function(error){
      console.log(error)
    })
  var catURL = '/cats/' + String(req.params.id)
  res.redirect(catURL)
})

router.post('/', function(req, res){
  var newCat = {
    name: req.body.name,
    url: req.body.image,
    story: req.body.life_story,
    lives: 100
  }
  catsDB.createNewCat(newCat)
    .then(function(newCat){
      console.log(newCat)
    })
    .catch(function(error){
      console.log(error)
    })
  res.redirect('/cats')
})

module.exports = router;
