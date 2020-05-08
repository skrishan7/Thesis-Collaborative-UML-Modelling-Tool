var encode = require('./encode');
var deflate = require('./deflate');

// https://plantuml.com/text-encoding
function compress(text) {
    // UTF-8 conversion
    let encodedText = unescape(encodeURIComponent(text));
    // Deflate
    encodedText = encode.encode64(deflate.zip_deflate(encodedText, 9));
    // encodedText = encode64(zip_deflate(encodedText, 9));
    console.log(encodedText);
    return 'http://www.plantuml.com/plantuml/png/' + encodedText;
}

// get request
async function getImage(url) {
    // Making a get request
    response = await fetch(url);
    // Converting response to blob
    response = await response.blob();
    // Blob gets turned into an object (png)
    const img = URL.createObjectURL(response);
    // Append png to DOM node
    // document.getElementById('img').setAttribute('src', img);
    return img;
}