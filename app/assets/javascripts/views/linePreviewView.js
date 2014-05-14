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
		console.log("inside linePreviewView init");
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
		console.log("class to toggle is: " + classToToggle);
		console.log("selector to toggle is: " + selectorToToggle);
		if(this.clicked == true){
			this.clicked = false;
			$(selectorToToggle).removeClass(classToToggle + '-clicked'); 
		} else {
			this.clicked = true;
			$(selectorToToggle).addClass(classToToggle + '-clicked'); 
		};
	},

});