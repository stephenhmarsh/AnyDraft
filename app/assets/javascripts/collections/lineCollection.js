var LineCollection = Backbone.Collection.extend({
	url: function(){
		return document.URL + '/lines'},
	model: Line,
	comparator: 'position',

	initialize: function(){
		console.log("New LineCollection created");
		this.autoFetch = setInterval(function(){
			this.fetch({
				success: function(){
					console.log("autoFetched successfully.");
				},
				error: function(){
					console.log("autoFetch failed.");
				}
			});
		}.bind(this), 1000);
	},

	stopAutoFetch: function(){
		clearInterval(this.autoFetch);
	},


}); 