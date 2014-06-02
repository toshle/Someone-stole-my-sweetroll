var express = require('express');
var app = express();

var comments = [];

var comment_count = 0;

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/views'));

app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

var addComment = function(comment_body) {
  comment_count += 1;
  comment_body.id = comment_count;
  comments.push(comment_body);
};

app.use(express.bodyParser());

app.get('/', function(req, res) {
  console.log("Someone took /");
  res.render('index', {
    "comments": comments,
  })
});

app.get('/all', function(req, res) {
  console.log("Someone took /all");
  res.send(comments);
});

app.post('/', function(req, res) {
  addComment(req.body);
  console.log("Someone posted /");
  console.log("Body " + JSON.stringify(req.body));
  res.send(req.body);
});

app.listen('3000', '192.168.133.3');
console.log("Listening to port 3000");