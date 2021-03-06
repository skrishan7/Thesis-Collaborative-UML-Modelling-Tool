const express = require('express');
const router = express.Router();
// const helper = require('../deflate/helper');
// import { compress } from '../deflate/helper'
var helper = require('../deflate/helper');
var ObjectID = require('mongodb').ObjectID;
var codeGenerator = require('../puml2code');

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
    // Uml.findById(req.params.id, function (err, result) {
    //     res.json(result);
    // })
    Uml.findById(new ObjectID(req.params.id))
        .exec(function (err, uml) {
            if (err) {
                res.json(err);
            } else {
                res.json(uml);
            }
        });
});

router.get('/codegen/:lang/:id', (req, res) => {
    // const codegen = codeGenerator.fromString("@startuml\n\ntitle Classes - Class Diagram\n\nclass Scheduler {\n    +Scheduler(Queue queue, Resources resource)\n    -{abstract}Type getType()\n    -bool setTypes(List<Value> value=[])\n    -int privFunc(Queue q)\n    -Object *iter()\n    -async privAsyncFunc(Queue queue=[])\n    +{abstract} async iterator(Object sort={})\n    -Queue queue\n    -Resources resoures\n}\n\n@enduml");
    // const codegen = p.fromFile('./example/class.puml');
    
    Uml.findById(new ObjectID(req.params.id))
        .exec(function (err, uml) {
            if (err) {
                res.json(err);
            } else {
                const codegen = codeGenerator.fromString(uml.content)
                codegen.generate(req.params.lang).then(out => {
                    res.json(out);
                });
            }
        });
});

// add uml
router.post('/uml', (req, res, next) => {
    let newUML = new Uml({
        filename: req.body.filename,
        content: req.body.content,
        encoded: req.body.encoded,
        url: req.body.url,
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
    Uml.update({ filename: req.params.filename }, {
        // Uml.findOneAndUpdate({ filename: req.params.filename }, {
        $set: {
            content: req.body.content,
            encoded: helper.compress(req.body.content),
            url: 'http://www.plantuml.com/plantuml/png/' + helper.compress(req.body.content),
            lastEditedBy: req.body.lastEditedBy
        }
    }, { new: true },
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

// router.get('export/')
// get latest entry
// router.get('/uml/latest', (req, res, next) => {
//     Uml.find().limit(1).sort({ $natural: -1 }).toArray(function (err, result) {
//         res.json(result);
//     })
// });

module.exports = router;
