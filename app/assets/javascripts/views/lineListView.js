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
				this.addAllByEmpty();
				// }
			}.bind(this)
		})

		this.listenTo(this.collection, 'change', this.drawAllButCurrent);
	},

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
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		lineInputView.$el.appendTo(this.$el)
	},

	addOneAtPosition: function(lineModel){
		//do some stuff
	},

	addNewOneAtPosition: function(prevPosition){
		var linesWithPositionsAbove = this.collection.select(function(line){
			return line.get('position') > prevPosition;
		});

		console.log(linesWithPositionsAbove);

		_.each(linesWithPositionsAbove, function(line){
			line.plusOnePosition();
		});  // THIS TRIGGERED X NUMBER CHANGE EVENTS. POSSIBLY USE {silent: true}
		
		var lineInput = new Line({
		  content    : "",
			user_color : "none",
			position : (prevPosition + 1)
		});

		this.collection.add(lineInput); // THIS WILL TRIGGER CHANGE EVENT.
		lineInput.save() // THIS WILL TRIGGER CHANGE EVENT?  *SHOULD INSERT INTO DOM AUTOMATICALLY WITH REDRAW*

		console.log("HERE IS OUR CHANGED COLLLECTION:");
		console.log(this.collection);
	},

	drawAllButCurrent: function(){
		this.collection.each(function(line){
			if(line.hasChanged()){
				console.log("Change was detected:");
				console.log(line.changedAttributes());
				// var linePosition = line.get('position');
				// 	if(linePosition != this.activeInputBox){
				// 		$('.line-input#' + linePosition).remove();
				// 		this.addOneAtPosition(line, linePosition);
				// 	}// end nested if
				} //end if
			}.bind(this) //end anon each function
		); //end each
	}, // end drawAll

	setFocus: function(){
		this.activeInputBox = document.activeElement.parentNode.getAttribute('id');
		console.log("Focus is set to : " + this.activeInputBox);
	}

})