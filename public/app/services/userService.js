angular.module('userService', [])

.factory('Usuario', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		return $http.get('/usuarios/' + id);
	};

	// get all users
	userFactory.all = function() {
		return $http.get('/usuarios/');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/usuarios/', userData);
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('/usuarios/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/usuarios/' + id);
	};

	// return our entire userFactory object
	return userFactory;

});
