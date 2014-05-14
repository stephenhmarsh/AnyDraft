var LinePreviewView = Backbone.View.extend({
	tagName: 'div',
	attributes : function () {
    return {
      class : 'preview-line ' + this.model.get('content_type'),
    };
  },
	
	initialize: function(){
		console.log("inside linePreviewView init");
		this.template = _.template($('#line-preview-template').html());
		this.render();
	},

	render: function(){
		var compiledView = this.template(this.model.toJSON());
		this.$el.html(compiledView);
	}
});