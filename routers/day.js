const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  // router specific middleware
  next();
});

router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/:project', (req, res) => {
  var project = req.params.project
  res.render('day/' + project + '/index');
});

module.exports = router;
