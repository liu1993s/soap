'use strict';
soap.directive('soapWrapper',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/admin/common/wrapper.htm'		
	};
})
.directive('soapHeader',function(){
	return {
		restrict: 'E',
		replace: true,
		controller: ['$scope','$menus',function($scope,$menus){
			console.log($menus);
			$scope.navs = $menus;
		}],
		templateUrl: 'template/admin/common/header.htm'
	}
})
.directive('soapToolbar',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/admin/common/toolbar.htm'
	}
})
.directive('soapSidebar',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/admin/common/sidebar.htm'
	}
})