var LinePreviewView = Backbone.View.extend({
	className: 'preview-line',

	initialize: function(){
		this.render();
	},

	render: function(){
		var content = this.model.get('content');
		// var author = this.model.get('user')
		this.$el.html(content)
	}

});