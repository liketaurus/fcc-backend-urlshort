module.exports = function(app, db) {
    var appUrl = process.env.APP_URL;
    app.route('/:url').get(redirectShortUrl);
    app.get('/new/:url*', newUrl);


    function checkURL(url) {
        // http://www.regexlib.com/REDetails.aspx?regexp_id=96
        var regex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/i;
        return regex.test(url);
    }

    function shortUrl() {
        var num = Math.floor(100000 + Math.random() * 900000);
        return num.toString().substring(0, 4);
    }

    function save(obj, db) {
        var links = db.collection('links');
        links.save(obj, function(err, result) {
            if (err) throw err;
            console.log('Saved ' + result);
        });
    }

    function newUrl(req, res) {
        var url = req.url.slice(5);
        var urlDocument = {};
        if (checkURL(url)) {
            urlDocument = {
                "full": url,
                "short": appUrl + shortUrl()
            };
            save(urlDocument, db);
            res.render(process.cwd() + '/ui/result.html', {
                short: urlDocument.short
            });
        }
        else {
            urlDocument = {
                "error": "Wrong format, double check the protocol and site existense."
            };
            res.render(process.cwd() + '/ui/error.html', {
                err: urlDocument.error
            });
        }
    }

    function findShortURL(link, db, res) {
        var links = db.collection('links');
        links.findOne({
            "short": link
        }, function(err, result) {
            if (err) throw err;
            if (result) {
                console.log('Link found !');
                console.log('Redirecting to: ' + result.full);
                res.redirect(result.full);
            }
            else {
                res.send({
                    "error": "Our DB doesn't contains this url!"
                });
            }
        });
    }

    function redirectShortUrl(req, res) {
        var url = appUrl + req.params.url;
        findShortURL(url, db, res);
    }

}