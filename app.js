var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/ui/index.html');
    });

// app.get('/:query', function(req, res) {
//     var date = req.params.query;
//     var unix = null;
//     var natural = null;

//     if (moment(date, "MMMM D, YYYY").isValid()) {
//         unix = naturalToUnix(date);
//         natural = unixToNatural(unix);
//     }
    
//     var n= Number(date);
//     if (n >= 0) {
//         unix = n;
//         natural = unixToNatural(unix);
//     }

//     var dateObj = {
//         "unix": unix,
//         "natural": natural
//     };
//     res.send(dateObj);

// });

app.listen(port, function() {
    console.log('Application started on port ' + port);
});