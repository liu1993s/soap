soap.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'template/soap/home.htm',
		controller: 'homeController'
	})
	.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}]);