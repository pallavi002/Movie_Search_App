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

app.listen('3000', function() {
  console.log('Movie App has Started..!!')
})