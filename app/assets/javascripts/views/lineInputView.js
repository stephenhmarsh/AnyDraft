var LineInputView = Backbone.View.extend({
	// el: "<div class='line-input' id='" + this.model.get('position') + "'></div>",
	el: "<div class='line-input' id=''></div>",

	events: {
		'keyup :input' : 'saveToModel',
		'keypress :input' : 'addInputBelow'
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
		this.model.save(); 
	},

	addInputBelow: function(e){
		if(e.which === 13){
			var inputModel = new Line();
			// this.parentView.collection.add(inputModel);
			this.parentView.addOne(inputModel);
		}
	}

});