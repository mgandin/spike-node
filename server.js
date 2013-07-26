var express = require('express')
, EmployeeDao = require('./dao').EmployeeDao;

var app = express();

app.configure(function (){
	app.set('port',3000);
});

app.get('/', function(req,res) {
	employeeDao.findAll(function(error,emps) {
		res.send(emps);
	});
});

app.get('/employee/new',function(req,res) {
	employeeDao.save({
		title: req.param('title'),
		name: req.param('name'),
	},function(error,docs) {
		res.redirect('/');
	});
});

var employeeDao = new EmployeeDao('localhost',27017);

app.listen(3000);