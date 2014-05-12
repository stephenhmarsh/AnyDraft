var ScriptPreviewView = Backbone.View.extend({

	initialize: function(){
		console.log("Made it to ScriptPreviewView initialize");
		var heading = '<h2>Preview</h2>';
		this.$el.append(heading);

		if (_.isEmpty(this.collection.models)){
			this.$el.append('<p>Ah, the beauty and terror of the blank page.</p>');
		} else {
			this.addAll();
		};

		this.addAll();
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.listenTo(this.collection, 'change', this.addAll);
	},

	addOne: function(lineModel){
		console.log("Adding one linePreview.")
		var linePreviewView = new LinePreviewView({model: lineModel});
		linePreviewView.$el.appendTo(this.$el);
	},

	addAll: function(){
		console.log("Made it to preview add all")
		this.$el.empty();
		var heading = '<h2>Preview</h2>';
		this.$el.append(heading);
		this.collection.each(this.addOne, this)
	}
	
});