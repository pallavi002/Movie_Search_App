const express = require('express');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('search'); 
});

app.get('/results', function(req, res) {
  let search = req.query.search;
  let url = 'http://www.omdbapi.com/?s=' + search + '&apikey=b37d3c68';
  request( url , function(error, response, body) {
    if( !error && response.statusCode == 200 ) {
      let data = JSON.parse(body)
      // res.send(results["Search"][0]["Title"]);
      res.render('results', {
        data: data
      });
    } else {
      res.send('Something went wrong');
    }
  })
});

app.get('/corona', function(req, res) {
  let url = 'https://api.covid19india.org/data.json';
  request(url, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      let first = data.body
      let result = JSON.parse(first);
      let active = result.statewise[1].active;
      let confirmed = result.statewise[1].confirmed;
      let deaths = result.statewise[1].deaths;
      let recovered = result.statewise[1].recovered;
      let updated = result.statewise[1].lastupdatedtime;
      res.send(result.statewise[1]);
    }
  })
})

app.listen('3000', function() {
  console.log('Movie App has Started..!!')
})