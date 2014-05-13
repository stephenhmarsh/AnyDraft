var LineInputView = Backbone.View.extend({
	tagName: "div",
	className: "line-input",

	events: {
		'keyup :input' : 'saveToModel',
		'keypress :input' : 'addInputBelow',
 	},

	initialize: function(){
		if(_.isEmpty(this.model.get('content'))){
			this.model.set('content', "");
		};
		this.$el.attr('id', this.model.get('position'));
		this.template = _.template($('#line-input-template').html());
		this.render();
	},

	render: function(){
		var compiledView = this.template(this.model.toJSON());
		this.$el.html(compiledView);
	},

	saveToModel: function(){
		var content = this.$('.line-content').val();
		console.log("what the heck is the line input??? " + this.$('.line-input').attr('id'));
		var position = this.$('.line-input').attr('id');
		this.model.set('content', content);
		this.model.save(); 
	},

	addInputBelow: function(e){
		console.log("My position is: " + this.model.get('position'));
		if(e.which === 13){
			var inputModel = new Line();
			var positionForNewModel = (this.model.get('position') + 1);
			inputModel.set('position', positionForNewModel);
			this.parentView.addOneAfterWithShift(inputModel, positionForNewModel); // i give the view a basically blank model that only has a position set to the line after the one we just hit enter on
		}
	}
});