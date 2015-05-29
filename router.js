module.exports = function(request,response){
	var path = request.path.replace(/^\//g,'').split('/')[0].toLowerCase();

	response.set({'X-Powered-By': 'soap'});
	if(path === 'api'){
		response.send('api');
	}else{
		response.set({'Content-Type': 'text/html'});
		if(path === 'admin'){
			response.sendfile('views/admin.htm');
		}else{
			response.sendfile('views/index.htm');
		}
	}
};