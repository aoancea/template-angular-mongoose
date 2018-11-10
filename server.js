var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect('mongodb://localhost:27017/AngularCRUD', function (err, response) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to ', db, '+', response);
	}
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Credentianls', true);
	next();
});

var Schema = mongo.Schema;

var UserSchema = new Schema({
	name: { type: String },
	address: { type: String },
}, { versionKey: false });

var model = mongo.model('users', UserSchema, 'users');

app.post('/api/SaveUser', function (req, res) {
	var mod = new model(req.body);

	if (req.body.mode = 'Save') {
		mod.save(function (err, data) {
			if (err) {
				res.send(err)
			} else {
				res.send({ data: 'Record has  been inserted..!!' });
			}
		});
	} else {
		model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address }, function (err, data) {
			if (err) {
				res.send(err)
			} else {
				res.send({ data: 'Record has  been updated..!!' });
			}
		});
	}
});


app.listen(8000, () => {
    console.log('server is now running on port 8000')
})