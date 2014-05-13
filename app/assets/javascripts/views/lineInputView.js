var LineInputView = Backbone.View.extend({
	// el: "<div class='line-input' id='" + this.model.get('position') + "'></div>",
	// el: "<div class='line-input' id=''></div>",
	tagName: "div",
	className: "line-input",

	events: {
		'keyup :input' : 'saveToModel',
		'keypress :input' : 'addInputBelow',
		'focusin :input' : 'setFocus',
		'focusout :input' : 'unsetFocus'
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
		// this.model.set('position', )
		// this.model.set('position', position);
		this.model.save(); 
	},

	addInputBelow: function(e){
		console.log("My position is: " + this.model.get('position'));
		if(e.which === 13){
			var inputModel = new Line();
			var positionForNewModel = (this.model.get('position') + 1);
			// console.log("about to add @ position: " + (this.model.get('position') + 1));
			inputModel.set('position', positionForNewModel);
			// this.parentView.collection.add(inputModel);
		
			this.parentView.addOne(inputModel, positionForNewModel);
		}
	},
	
	setFocus: function(){
		console.log("Focus set in text input!!! Which one: " + this.model.get('position'));
	},

	unsetFocus: function(){
		console.log("Focus UNSET!!!"  + this.model.get('position'));
	},
});