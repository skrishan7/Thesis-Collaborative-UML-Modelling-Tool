const express = require('express');
const router = express.Router();
// const helper = require('../deflate/helper');
// import { compress } from '../deflate/helper'
var helper = require('../deflate/helper');

const Uml = require('../models/uml');

// retrieving all umls
router.get('/umls', (req, res, next) => {
    Uml.find(function (err, result) {
        res.json(result);
    })
});

// get uml by filename 
router.get('/uml/:filename', (req, res) => {
    Uml.findOne({ filename: req.params.filename }, function (err, result) {
        res.json(result);
    })
});

// get uml by id 
router.get('/uml/id/:id', (req, res) => {
    // Uml.findById(req.params._id, function (err, result) {
    //     res.json(result);
    // })
    Uml.findById(req.params.id)
    .exec(function (err, product) {
        if (err) {
            res.json(err);
        } else {
            res.json(product);
        }
    })
});

// add uml
router.post('/uml', (req, res, next) => {
    let newUML = new Uml({
        filename: req.body.filename,
        content: req.body.content,
        encoded: req.body.encoded,
        lastEditedBy: req.body.lastEditedBy
    });

    newUML.save((err, uml) => {
        if (err) {
            res.json({
                msg: 'Failed to add UML'
            });
        } else {
            res.json({
                msg: 'UML added successfully'
            });
        }
    })
});

router.put('/uml/:filename', (req, res, next) => {
    Uml.update({filename: req.params.filename}, {
    // Uml.findOneAndUpdate({ filename: req.params.filename }, {
        $set: {
            content: req.body.content,
            encoded: helper.compress(req.body.content),
            lastEditedBy: req.body.lastEditedBy
        }
    }, {new: true},
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
});

// deleting uml
router.delete('/uml/:filename', (req, res, next) => {
    Uml.remove({ filename: req.params.filename }, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

// get latest entry
// router.get('/uml/latest', (req, res, next) => {
//     Uml.find().limit(1).sort({ $natural: -1 }).toArray(function (err, result) {
//         res.json(result);
//     })
// });

module.exports = router;
