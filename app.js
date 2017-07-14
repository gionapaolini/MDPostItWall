var express = require('express');
var controller = require('./controllers/controller');
var app = express();

app.set('view engine', 'ejs');

app.use('/assets',express.static('assets'));

controller(app);

app.listen(3000);
console.log('Listening to port 3000');
//texts[<%= i%>] = "<%= postit[i].text;  %>"; 