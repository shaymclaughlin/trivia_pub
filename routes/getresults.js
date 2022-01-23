var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('getresults', { title: 'QR Code Results' });
});

router.post('/', function(req, res, next) {
    //console.log('Got body:', req.body);
    let data = req.body;
    let input = data.qrcodeinput;
    let qrData = false;
    if (input.length !== 0) {
        QRCode.toDataURL(input, {version: 2,width: 400}, function (err, url) {
            res.render('getresults', { title: 'QR Code Results', qrdata: url});
        });
    }
    else {
        
        res.render('getresults', { title: 'QR Code Results', qrdata: qrData});
    }
    


  });
module.exports = router;
