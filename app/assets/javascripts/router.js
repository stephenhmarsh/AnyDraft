var AppRouter = Backbone.Router.extend({
	routes: {
		"": "scriptBoot"
	},

	initialize: function(){
		this.collection = new LineCollection(); // all the lines
		this.lineListView = new LineListView({collection: this.collection}); // the list view of line inputs
		this.scriptPreviewView = new ScriptPreviewView({collection: this.collection}); // the list view of line previews
	},

	start: function(){
		Backbone.history.start();
	},

	scriptBoot: function(id){
		console.log("scriptBooted")
		this.collection.fetch({
			success: function(){
				console.log("Collection Successfully fetched.");
				$('.editor').html(this.lineListView.el);
				$('.preview').html(this.scriptPreviewView.el);	
			}.bind(this)
		});
	}

});