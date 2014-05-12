var LineInputView = Backbone.View.extend({
	className: 'line-input',

	events: {
		'keyup :input' : 'saveToModel'
	},

	initialize: function(){
		if(_.isEmpty(this.model.get('content'))){
			this.model.set('content', "");
		};
		console.log("The content of this model is: " + this.model.get('content'));
		this.template = _.template($('#line-input-template').html());
		this.render();
	},

	render: function(){
		var compiledView = this.template(this.model.toJSON());
		this.$el.html(compiledView);
	},

	saveToModel: function(){
		var content = this.$('#line-content').val();
		this.model.set('content', content);
		this.model.save(); // does set automatically save?
	}

});