'use strict';
var globalCollection = soap.dao.db.bind('article');

globalCollection.bind({
	getConfig: function(){
		this.find({

		});
	},
	setConfig: function(){
		console.log('setConfig');
	}
});

module.exports = {
	getConfig: globalCollection.getConfig,
	setConfig: globalCollection.setConfig
};