var LineListView = Backbone.View.extend({
	
	initialize: function(){
		var heading = '<h2>Fountain Editor</h2>';
		this.$el.append(heading);

		if (_.isEmpty(this.collection.models)){
			this.addNewBlank();
		} else {
			this.addAll();
		};
			
		// this.listenTo(this.collection, 'add', this.addOneManually);
		// this.listenTo(this.collection, 'change', this.addAll);
		this.listenTo(this.collection, 'change', this.drawAllButCurrent);
		// this.listenTo(this.collection, 'reset', this.addAll);
		this.listenTo(this.collection, 'reset', this.drawAllButCurrent);
		// this.listenTo(this.collection, 'change', this.addAll);
	},

	addNewBlank: function(){
		var lineInput = new Line();
		lineInput.set('position', 0);
		lineInput.set('content', "...FADE IN:");
		this.collection.add(lineInput);
		var lineInputView = new LineInputView({model: lineInput});
		lineInputView.$el.appendTo(this.$el);
	},

	// deprecated but might need to bring it back
	// addTenBlank: function(){
	// 	console.log("made it to addTenBlank")
	// 	for(var i = 0; i < 10; i++){
	// 		var lineInput = new Line();
	// 		this.collection.add(lineInput);
	// 		var lineInputView = new LineInputView({model: lineInput});
	// 		lineInputView.$el.appendTo(this.$el);
	// 	};
	// },

	addOne: function(lineModel, position){
		console.log("Adding one lineInput.")
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		lineInputView.$el.appendTo(this.$el);	
	},

	addOneAfter: function(lineModel, position){
		console.log("Adding one lineInput after a sibling.")
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		var whereToAppend = '.line-input#' + (lineModel.get('position') - 1);
		$(whereToAppend).after(lineInputView.$el);
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
	},

	drawAllButCurrent: function(){
		this.collection.each(function(line){
			if(line.hasChanged()){
				console.log("Change was detected!!!");
				var linePosition = line.get('position');
				$('.line-input#' + linePosition).remove();
				this.addOneAfter(line);
				} //end if
			}.bind(this) //end anon each function
		); //end each
	}, // end drawAll


})