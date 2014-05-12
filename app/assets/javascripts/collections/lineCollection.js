var LineCollection = Backbone.Collection.extend({
	url: function(){
		return document.URL + '/lines'},
	model: Line,

	initialize: function(){
		console.log("New LineCollection created");
	}
}); 