//libraries 
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test@ds153422.mlab.com:53422/mdtest', {
  useMongoClient: true,
});

//creation of the post it schema and model
var postItSchema = new mongoose.Schema({
    text: String,
    id: Number
});
var PostIt = mongoose.model('PostIt',postItSchema);

//initializing bodyparser for encoding requested data
var urlencodedParser = bodyParser.urlencoded({extended: false});



module.exports = function(app){

    app.get('/', function(req,res) {
           PostIt.find({}, function  (err, data) {
           	if(err) throw err;
           	 res.render('index',{postit:data});
           })
          
    });

    app.delete('/',urlencodedParser,function (req,res) {
 
        PostIt.find({id: req.body.id}).remove(function (err, data) {
            if(err) throw err;
            res.json(data);
         });
    });

    app.post('/', urlencodedParser, function(req,res) {

    	 var newPostit = PostIt({text: req.body.text, id: req.body.id});
    	 
    	 newPostit.save(function (err,data) {
	            if(err) throw err;
	            res.json(data);
 
	 });
    	
    });

   
};
