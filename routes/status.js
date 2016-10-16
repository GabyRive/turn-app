const express = require('express');
const router = express.Router();
const models = require('../models');

router.route('/')
  .all()
  .get((req, res, next) => {
    let updatedPatient = req.query;

    // updatedPatient.date = Date();

    // models.Patients.find({ appointments.date: }, (patients)=>{
    let data = [{ record: 1},{ record: 15},{ record: 14},{ record: 13},{ record: 12}];

      res.render('status/status', {layout: "main", title: "status", patients: data});
    // })

  })
  .post((req, res, next) => {
    res.render('status/status', {title: "status"});
  })

module.exports = router;
