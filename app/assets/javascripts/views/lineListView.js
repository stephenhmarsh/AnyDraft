var LineListView = Backbone.View.extend({
	
	initialize: function(){
		var heading = '<h2>Fountain Editor</h2>';
		this.$el.append(heading);

		if (_.isEmpty(this.collection.models)){
			this.addTenBlank();
		};
		
		// this.addAll();
		
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
	},

	addTenBlank: function(){
		console.log("made it to addTenBlank")
		for(var i = 0; i < 10; i++){
			var lineInput = new Line();
			this.collection.add(lineInput);
			var lineInputView = new LineInputView({model: lineInput});
			lineInputView.$el.appendTo(this.$el);
		};
	},

	addOne: function(){
		console.log("Adding one.")
		var lineInputView = new LineInputView();
		lineInputView
	},

	addAll: function(){
		console.log("Adding all.")
		this.$el.empty();
		this.collection.each(this.addOne, this)
	}

})