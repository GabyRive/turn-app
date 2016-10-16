const express = require('express');
const router = express.Router();

router.route('/template')
  .all()
  .get((req, res, next) => {
    res.render('template', {title: "Template"});
  })
  .post((req, res, next) => {
    res.render('template', {title: "Template"});
  })

module.exports = router;
