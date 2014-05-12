console.log("LineCollection JS loaded")
console.log("I think our URL is: " + document.URL + '/lines')
var LineCollection = Backbone.Collection.extend({
	url: function(){
		return document.URL + '/lines'},
	model: Line,

	initialize: function(){
		console.log("New LineCollection created");
	}
});