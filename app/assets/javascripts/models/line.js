console.log("Line Model JS loaded");
var Line = Backbone.Model.extend({
	urlRoot: function(){
		return document.URL + '/lines'
	},

});