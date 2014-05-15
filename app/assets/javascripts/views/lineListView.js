var LineListView = Backbone.View.extend({

	events: {
		'focusin :input' : 'setFocus',
 	},
	
	initialize: function(){
		// var heading = '<h2>Fountain Editor</h2>';
		// this.$el.append(heading);

		// if (_.isEmpty(this.collection.models)){
		// 	this.addNewBlank();
		// } else {
			this.addAll();
		// };

		// this.listenTo(this.collection, 'change', this.drawAllButCurrent);

		//i shouldn't need this, any reset that has changes will trigger it:
		// this.listenTo(this.collection, 'reset', this.drawAllButCurrent);
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

	addAll: function(){
		console.log("Adding all.");
		this.$el.empty();
		var heading = '<h2>Fountain Editor</h2>';
		this.$el.append(heading);
		this.collection.each(this.addOne, this)
	},

	addOne: function(lineModel){
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		lineInputView.$el.appendTo(this.$el);	
	},

	addOneAfter: function(lineModel, position){
		console.log("Adding one lineInput after a sibling.")
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		var previousLinePosition = (lineModel.get('position') - 1);
		var whereToAppend = '.line-input#' + previousLinePosition;
		$(whereToAppend).after(lineInputView.$el);
	},

	addOneAfterWithShift: function(lineModel){
		console.log("Adding one lineInput after a sibling.")
		var lineInputView = new LineInputView({model: lineModel});
		lineInputView.parentView = this;
		var position = lineInputView.model.get('position')

		this.collection.shiftPositions(position, "add");
	
		var previousLinePosition = (position - 1);
		var whereToAppend = '.line-input#' + previousLinePosition;
		$(whereToAppend).after(lineInputView.$el);
	},

	drawAllButCurrent: function(){
		this.collection.each(function(line){
			if(line.hasChanged()){
				console.log("Change was detected!!!");
				var linePosition = line.get('position');
					if(linePosition != this.activeInputBox){
						$('.line-input#' + linePosition).remove();
						this.addOneAfter(line);
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