var db = require('mongodb').Db;
var server = require('mongodb').Server;


EmployeeDao = function(host,port) {
	this.db = new db('node-mongo-employee',new server(host,port,{safe: false},{autoreconnect: true},{}));
	this.db.open(function(){});
};

EmployeeDao.prototype.getCollection = function(callback) {
	this.db.collection('employees',function(error, employeeCollection) {
		if(error) callback(error);
		else callback(null,employeeCollection);
	});
};

EmployeeDao.prototype.findAll = function(callback) {
	this.getCollection(function (error, employeeCollection) {
		if(error) callback(error);
		else {
			employeeCollection.find().toArray(function (error,results) {
				if(error) callback(error);
				else callback(null, results);
			});
		}
	});
};

EmployeeDao.prototype.save = function(employees,callback) {
	this.getCollection(function (error,employeeCollection) {
		if(error) callback(error);
		else {
			if(typeof(employees.length) == "undefined")
				employees = [employees];
			for(var i = 0; i < employees.length;i++) {
				employee = employees[i];
				employee.created_at = new Date();
			}
			employeeCollection.insert(employees,function() {
				callback(null,employees);
			});
		}
	});
};

exports.EmployeeDao = EmployeeDao;