soap.service('$utils',['$filter',function($filter){
	return {
		getTime: function(){
			return +new Date;
		},
		str2time: function(string){
			if(!string) return;
			return new Date(string).getTime();
		},
		time2str: function(timestamp,format){
			if(!timestamp) return;
			if(format == 'auto') return this.time2cpstr(timestamp);
			return $filter('date')(timestamp,format || 'yyyy-MM-dd HH-mm')
		},
		time2cpstr: function(timestamp){
			var current = this.getTime();
			var decrease = parseInt((current - timestamp) / 1000,10);
			if(decrease <= 0) return '刚刚';
			if(decrease < 60) return decrease + ' 秒前';
			if(decrease < 3600) return Math.ceil(decrease / 60) + ' 分钟前';
			decrease = parseInt((this.str2time(this.time2str(current,'yyyy-MM-dd')) - this.str2time(this.time2str(timestamp,'yyyy-MM-dd'))) / 1000,10);
			if(decrease == 0) return '今天 ' + this.time2str(timestamp,'HH:mm');
			if(decrease == 86400) return '昨天 ' + this.time2str(timestamp,'HH:mm');
			if(decrease == 172800) return '前天 ' + this.time2str(timestamp,'HH:mm');
			if(this.time2str(timestamp,'yyyy') == this.time2str(current,'yyyy')) return this.time2str(timestamp,'MM-dd HH-mm');
			return this.time2str(timestamp);
		}
	}
}]);