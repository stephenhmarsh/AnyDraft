var LinePreviewView = Backbone.View.extend({
	tagName: 'div',
	events: {
		'click' : 'toggleBackground'
	},

	attributes : function () {
    return {
      class : 'preview-line ' + this.model.get('content_type'),
    };
  },
	
	initialize: function(){
		this.template = _.template($('#line-preview-template').html());
		this.render();
	},

	render: function(){
		var compiledView = this.template(this.model.toJSON());
		this.$el.html(compiledView);
	},

	toggleBackground: function(){
		var classToToggle = this.model.get('user_color');
		var selectorToToggle = '.' + classToToggle;
	
		if(this.clicked == true){
			this.clicked = false;
			$(selectorToToggle).removeClass(classToToggle + '-clicked'); 
		} else {
			this.clicked = true;
			$(selectorToToggle).addClass(classToToggle + '-clicked'); 
		};
	},

});