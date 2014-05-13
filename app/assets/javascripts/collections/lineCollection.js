var LineCollection = Backbone.Collection.extend({
	url: function(){
		return document.URL + '/lines'},
	model: Line,

	initialize: function(){
		console.log("New LineCollection created");
	},

	shiftPositions: function(currentPosition, method){
		if(method == "add"){
			var linesAbove = this.filter(function(lineModel){return currentPosition < lineModel.get('position')});
			console.log(linesAbove);	
			_.each(linesAbove, function(lineModel){
				var newPos = lineModel.get('position')+1;
				lineModel.set('position', newPos);
			});
		} // end if
	} // end shift Positions function
}); 