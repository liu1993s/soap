module.exports = function(request,response){
	var path = request.path.replace(/^\//g,'').split('/')[0].toLowerCase();

	response.set({'X-Powered-By': 'soap'});
	if(path === 'api'){
		soap.api[request.path[1]][request.method](request,response);
	}else{
		response.set({'Content-Type': 'text/html'});
		if(path === 'admin'){
			response.sendfile('views/admin.htm');
		}else{
			response.sendfile('views/index.htm');
		}
	}
};