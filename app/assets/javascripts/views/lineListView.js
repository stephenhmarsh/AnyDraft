var LineListView = Backbone.View.extend({
	
	initialize: function(){
		var heading = '<h2>Fountain Editor</h2>';
		this.$el.append(heading);

		if (_.isEmpty(this.collection.models)){
			this.addTenBlank();
		} else {
			this.addAll();
		};
			
		this.listenTo(this.collection, 'add', this.addOneManually);
		this.listenTo(this.collection, 'change', this.addAll);
		this.listenTo(this.collection, 'reset', this.addAll);
		// this.listenTo(this.collection, 'change', this.addAll);
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

	addOne: function(lineModel){
		console.log("Adding one lineInput.")
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		var thingToFocus = lineInputView.$el;
		lineInputView.$el.appendTo(this.$el);
		thingToFocus.css("focus", "true");
		// $().focus();
	},

	addOneManually: function(lineInputView){
		console.log("we hit the add one manually manually!!");
	},

	addAll: function(){
		console.log("Made it to LineList Adding all.");
		this.$el.empty();
		var heading = '<h2>Fountain Editor</h2>';
		this.$el.append(heading);
		this.collection.each(this.addOne, this)
	}

})