'use strict';
angular
.module('7ZhuangB',['ngRoute','ngResource'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		redirectTo: '/welcome'
	})
	.when('/welcome',{
		templateUrl: 'template/page/home.htm',
		controller: 'homeController'
	});
}])
.run(['$rootScope','$templateCache',function($rootScope,$templateCache){
	$rootScope.domain = document.domain.replace(/^(.+?\.)??(?=(test\.)?[^.]+\.\w+$)/,'');
	$templateCache.put('template/common/wrapper.htm','<div class="wrapper"><header></header><div class="container" ng-view></div><footer></footer></div>');
	$templateCache.put('template/common/header.htm','<div class="header"><div class="logo"><h1><a href="/">一起装逼吧</a></h1></div><div class="clearfix"></div><ul class="nav"><li ng-repeat="nav in navs" ng-init="lock=false" ng-mouseenter="lock=!lock" ng-mouseleave="lock=!lock"><a ng-href="{{ nav.url }}" ng-bind="nav.name"></a><ul ng-if="nav.items" ng-show="lock"><li ng-repeat="child in nav.items"><a ng-href="{{ child.url }}" ng-bind="child.name"></a></li></ul></li></ul></div>');
	$templateCache.put('template/common/footer.htm','<div class="footer"><a href="http://www.miibeian.gov.cn/">鄂ICP备88888888号</a> · <a href="">关于装逼</a> · <a href="">投放广告</a> · <a href="">友情链接</a></div>')
	$templateCache.put('template/page/home.htm','<div class="content"><article></article></div><div class="sidebar"></div>');
	$templateCache.put('template/module/article.htm','<ul class="article"><li ng-repeat="article in articles"><a class="thumbs" style="background-image:url({{ article.thumbs }});"></a><div class="details"><div class="comment">{{ article.comment }}</div><span><a href="{{ article.url }}">{{ article.tags }}</a> , {{ article.postdate | formatDate }}</span><a href="{{ article.url }}"><h2>{{ article.subject }}</h2></a><p>{{ article.description }}</p><div class="star"><i class="icon-star-o"></i>{{ article.like }}</div></div></li></ul>');
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
.directive('article',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/module/article.htm'
	}
})
.directive('footer',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'template/common/footer.htm'
	};
})
.controller('homeController',['$scope','$http',function($scope,$http){
	$http
	.get('data/article.json')
	.success(function(data){
		$scope.articles = data;
	});
}])
.filter('formatDate',function(){
	return function(timestamp){
		if(timestamp.length < 10) return timestamp;
		if(timestamp.length > 10) timestamp = timestamp.substring(0,10);
		var current = parseInt(new Date().getTime() / 1000,10);
		if(current < timestamp) return;
	}
});