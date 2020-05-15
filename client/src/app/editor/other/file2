const express = require('express');
const router = express.Router();

// const Plantuml = require('../models/plantuml');
const helper = require('../deflate/helper');
const Plantuml = require('../models/uml');

var encode = require('../deflate/encode');
var deflate = require('../deflate/deflate');



// router.get('getImage', (req, res, next) => {
//     url = compress(req.body);
//     // console.log(req.body);
//     console.log('hereee');
//     res.sendFile(helper.getImage(url));
// });

router.get('compress', (req, res, next) => {
    text = Plantuml.find().limit(1).sort({ $natural: -1 }).text;
    compressedText = compress(text);
    res.json(compressedText);
});

// https://plantuml.com/text-encoding
function compress(text) {
    // UTF-8 conversion
    let encodedText = unescape(encodeURIComponent(text));
    // Deflate
    encodedText = encode.encode64(deflate.zip_deflate(encodedText, 9));
    // encodedText = encode64(zip_deflate(encodedText, 9));
    console.log(encodedText);
    return 'http://www.plantuml.com/plantuml/png/' + encodedText;
};

module.exports = router;
