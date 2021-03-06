var LineInputView = Backbone.View.extend({
	tagName: "div",
	className: "line-input",

	events: {
		'keyup :input' : 'saveToModel',
		'keypress :input' : 'addInputBelow',
 	},

	initialize: function(){
		this.$el.attr('id', this.model.get('id'));
		this.template = _.template($('#line-input-template').html());
		this.render();
	},

	render: function(){
		var compiledView = this.template(this.model.toJSON());
		this.$el.html(compiledView);
	},

	saveToModel: function(){
		var content = this.$('.line-content').val();
		this.model.set('content', content);
		this.model.save(); 
	},

	addInputBelow: function(e){
		if(e.which === 13){
			var position = this.model.get('id');
			console.log("you hit enter @ position (id of self): " + position);
			this.parentView.addNewOneAtPosition(position);
		}
	}
});