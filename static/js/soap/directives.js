soap.directive('soapWrapper',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/soap/common/wrapper.htm'
	}
})
.directive('soapHeader',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/soap/common/header.htm'
	}
})
.directive('soapNav',function(){
	return {
		restrict: 'E',
		replace: true,
		controller: ['$scope','$http',function($scope,$http){
			$http.get('data/navs.json').success(function(data){
				$scope.navs = data;
			});
		}],
		templateUrl: 'template/soap/common/nav.htm'
	}
})
.directive('soapSidebar',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/soap/common/sidebar.htm'
	}
})
.directive('soapFooter',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/soap/common/footer.htm'
	}
});