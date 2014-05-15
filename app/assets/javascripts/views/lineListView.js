var LineListView = Backbone.View.extend({

	events: {
		'focusin :input' : 'setFocus',
 	},
	
	initialize: function(){
		this.collection.fetch({
			success: function(){
				// if (_.isEmpty(this.collection.models)){
				// 	this.addNewBlank();
				// } else {
				// this.addFirstOne();
				this.addAllByEmpty();
				// }
			}.bind(this)
		})

		this.listenTo(this.collection, 'change', this.drawAllButCurrent);
	},

	// addFirstOne: function(){
	// 	console.log("whats in the collection")
	// 	var firstOne = this.collection.find(function(line){
	// 		line.get('position') == 0;
	// 	}, this);
	// 	var lineInputView = new LineInputView({model: firstOne});
	// 	lineInputView.parentView = this;
	// 	lineInputView.$el.appendTo(this.$el)
	// },

	addNewBlank: function(){
		var lineInput = new Line();
		lineInput.set({
			position   : 0,
			content    : "FADE IN:",
			user_color : "none"
		});
		this.collection.add(lineInput);
		// I shouldn't need this. the 'change' event of something being added should trigger a redraw:::
		// var lineInputView = new LineInputView({model: lineInput});
		// lineInputView.$el.appendTo(this.$el);
	},

	addAllByEmpty: function(){
		console.log("Adding all.");
		this.$el.empty();
		var heading = '<h2>Fountain Editor Test</h2>';
		this.$el.append(heading);
		console.log("whats in the collection?")
		console.log(this.collection);
		this.collection.each(this.addOne, this);
	},

	addOne: function(lineModel){
		if (lineModel.get('position') == 0){
			var lineInputView = new LineInputView({model: lineModel});
			lineInputView.parentView = this;
			lineInputView.$el.prependTo(this.$el)
		} else {
			var parent = '#' + lineModel.get('position');
			var lineInputView = new LineInputView({model: lineModel});
			lineInputView.parentView = this;
			lineInputView.$el.insertAfter($(parent));
		}
	},

	addNewOneAtPosition: function(previous){
		var lineInput = new Line({
		  content    : "",
			user_color : "none",
			position : (previous)
		});

		this.collection.add(lineInput); // THIS WILL TRIGGER CHANGE EVENT.
		lineInput.save(); // THIS WILL TRIGGER CHANGE EVENT?  *SHOULD INSERT INTO DOM AUTOMATICALLY WITH REDRAW*
	},

	drawAllButCurrent: function(){
		this.collection.each(function(line){
			if(line.hasChanged()){
				console.log("Change was detected:");
				console.log(line.changedAttributes());
				var lineId = line.get('id');
					if(lineId != this.activeInputBox){
						$('.line-input#' + lineId).remove();
						this.addOne(line);
					}// end nested if
				} //end if
			}.bind(this) //end anon each function
		); //end each
	}, // end drawAll

	setFocus: function(){
		this.activeInputBox = document.activeElement.parentNode.getAttribute('id');
		console.log("Focus is set to : " + this.activeInputBox);
	}

})