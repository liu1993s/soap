soap.filter('dateFormat',['$utils',function($utils){
	return function(timestamp){
		return $utils.time2cpstr(timestamp);
	}
}]);