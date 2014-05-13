var AppRouter = Backbone.Router.extend({
	routes: {
		"": "scriptBoot"
	},

	initialize: function(){
		this.collection = new LineCollection(); // all the lines
		// this.navigate("");
		// this.scriptBoot();
	},

	start: function(){
		Backbone.history.start();
	},

	scriptBoot: function(id){
		console.log("scriptBooted")
		this.collection.fetch({
			success: function(){
				console.log("Collection Successfully fetched. From scriptBoot");
				this.lineListView = new LineListView({collection: this.collection}); // the list view of line inputs
				this.scriptPreviewView = new ScriptPreviewView({collection: this.collection}); // the list view of line previews

				$('.editor').html(this.lineListView.el);
				$('.preview').html(this.scriptPreviewView.el);	
			}.bind(this)
		});
		this.timer = setInterval(function(){
			this.collection.fetch();
			console.log("autofetched");
		}.bind(this), 1000);
	},

});