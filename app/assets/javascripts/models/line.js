var Line = Backbone.Model.extend({
	urlRoot: function(){
		return document.URL + '/lines'
	},

	plusOnePosition: function(){
		var pos = this.get('position');
		var newPos = pos + 1;
		console.log("Changing position from " + pos + " to: " + newPos);
		this.set('position', newPos);
		this.save();
	},

});