var ScriptPreviewView = Backbone.View.extend({

	initialize: function(){
		console.log("Made it to ScriptPreviewView initialize");
		var heading = '<h2>Preview</h2>';
		this.$el.append(heading);

		// if (_.isEmpty(this.collection.models)){
		// 	console.log("made it to the if statement");
			// this.$el.append('<p>Ah, the beauty and terror of the blank page.</p>');
		// };

		this.addAll();
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
	},

	addOne: function(){
		// var linePreviewView = new LinePreviewView({model: line});
	},

	addAll: function(){
		console.log("Made it to preview add all")
		// this.$el.empty();
		// this.collection.each(this.addOne, this);
	}
	
});