var AppRouter = Backbone.Router.extend({
	routes: {"": "index"},

	initialize: function(){
		this.collection = new LineCollection(); 
		this.lineListView = new LineListView({collection: this.collection});
		this.scriptPreviewView = new ScriptPreviewView({collection: this.collection});
	},

	start: function(){
		Backbone.history.start();
	},

	index: function(){
		//some stuff to make it work
		console.log("we hit the index function");
		$('.editor').html(this.lineListView.el);
		$('.preview').html(this.scriptPreviewView.el);
	}

});