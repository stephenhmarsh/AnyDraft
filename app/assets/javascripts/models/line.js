var Line = Backbone.Model.extend({
	urlRoot: function(){
		return document.URL + '/lines'
	},

	plusOnePosition: function(){
		var pos = this.get('position');
		var newPos = pos + 1;
		console.log("Changing position from " + pos + " to: " + newPos);
		this.set('position', newPos);
		this.save(); // SAVES HERE. THIS WILL TRIGGER CHANGE EVENT.  WHICH REDRAWS. NEXT THING HASNT BEEN CHANGED (YET), SO TWO WILL TEMPORARILY HAVE SAME POSITION.
	},

});