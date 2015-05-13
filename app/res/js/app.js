'use strict';
angular
.module('7ZhuangB',['ngRoute','ngResource'])
.run(['$templateCache',function($templateCache){
	$templateCache.put('template/common/wrapper.htm','<div class="wrapper"><header></header><container></container><footer></footer></div>');
	$templateCache.put('template/common/header.htm','<div class="header"><div class="logo"><h1><a href="/">一起装逼吧</a></h1></div><div class="clearfix"></div><ul class="nav"><li ng-repeat="nav in navs" ng-init="lock=false" ng-mouseenter="lock=!lock" ng-mouseleave="lock=!lock"><a ng-href="{{ nav.url }}" ng-bind="nav.name"></a><ul ng-if="nav.items" ng-show="lock"><li ng-repeat="child in nav.items"><a ng-href="{{ child.url }}" ng-bind="child.name"></a></li></ul></li></ul></div>');
	$templateCache.put('template/common/container.htm','<div class="container"><content></content><sidebar></sidebar></div>');
	$templateCache.put('template/common/footer.htm','<div class="footer"><a href="http://www.miibeian.gov.cn/">鄂ICP备88888888号</a> · <a href="">关于装逼</a> · <a href="">投放广告</a> · <a href="">友情链接</a></div>')
	// $rootScope.domain = document.domain.replace(/^(.+?\.)??(?=(test\.)?[^.]+\.\w+$)/,'');
}])
.directive('wrapper',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/common/wrapper.htm'
	};
})
.directive('header',function(){
	return {
		restrict: 'E',
		replace: true,
		controller: ['$scope','$resource',function($scope,$resource){
			$resource('data/navs.json').query(function(data){
				var navs = [];
				angular.forEach(data,function(data){
					angular.forEach(data,function(data){
						navs.push(data);
					});
				});
				angular.forEach(navs,function(data,i){
					var items = [];
					angular.forEach(data.items,function(data){
						items.push(data);
					});
					navs[i].items = items;
				});
				$scope.navs = navs;
			});
		}],
		templateUrl: 'template/common/header.htm'
	};
})
.directive('container',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/common/container.htm'
	}
})
.directive('footer',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/common/footer.htm'
	};
});