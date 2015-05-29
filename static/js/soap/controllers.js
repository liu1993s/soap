soap.controller('homeController',['$scope','$http',function($scope,$http){
	$http.get('data/articles.json').success(function(data){
		$scope.articles = data;
	});
}]);