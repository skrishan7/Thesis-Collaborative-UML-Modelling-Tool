const express = require('express');
const router = express.Router();
const helper = require('../deflate/helper');

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

// add uml
router.post('/uml', (req, res, next) => {
    let newUML = new Uml({
        filename: req.body.filename,
        // content: req.body.content,
        // encoded: req.body.encoded,
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
    Uml.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            filename: req.body.filename,
            content: req.body.content,
            encoded: helper(req.body.content),
            lastEditedBy: req.body.lastEditedBy
        }
    },
        function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(encoded);
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
