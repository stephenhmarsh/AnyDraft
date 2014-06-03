var ScriptPreviewView = Backbone.View.extend({

	initialize: function(){
		this.collection.fetch({
			success: function(){
				this.addAll();
			}.bind(this)
		})

		this.listenTo(this.collection, 'change', this.drawAllButCurrent);		
		this.listenTo(this.collection, 'reset', this.addAll);
		this.listenTo(this.collection, 'change', this.addAll);
	},

	addOne: function(lineModel){
		var linePreviewView = new LinePreviewView({model: lineModel});
		linePreviewView.$el.appendTo(this.$el);
	},

	addAll: function(){
		this.$el.empty();
		this.collection.each(this.addOne, this)
	}
	
});