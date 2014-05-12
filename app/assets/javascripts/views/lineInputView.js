var LineInputView = Backbone.View.extend({
	className: 'line-input',

	events: {
		'keyup' : 'saveToModel'
	},

	initialize: function(){
		this.template = '<input type="text" id="line-content"/>'
		this.render();
	},

	render: function(){
		this.$el.html(this.template);
	},

	saveToModel: function(){
		var content = this.$('#line-content').val();
		this.model.set('content', content);
		this.model.save(); // does set automatically save?
	}

});