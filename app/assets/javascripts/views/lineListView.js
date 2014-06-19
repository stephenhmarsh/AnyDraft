var LineListView = Backbone.View.extend({

	events: {
		'focusin :input' : 'setFocus',
 	},
	
	initialize: function(){
		this.collection.fetch({
			success: function(){
				if (_.isEmpty(this.collection.models)){
					this.addNewBlank();
				} else {
				this.addAllByEmpty();
				}
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
		lineInput.save({content_type: "transition"});
	},

	addAllByEmpty: function(){
		console.log("Adding all.");
		this.$el.empty();
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
		var previousInputModel = this.collection.find(function(line){ 
      return Number(line.get('id')) === previous;
		});

		console.log("okay we're coming from " + previousInputModel.get('id'))

		var oldChild = this.collection.findWhere({position: previous});

		if (previousInputModel.get('position') != 0 && oldChild){
			console.log(oldChild.get('id'));

			var oldChild = this.collection.findWhere({position: previous});
			
			console.log("Our old child was: " + oldChild.get('id'));

			var lineInput = new Line({
			  content    : "",
				user_color : "none",
				position : (previous)
			});

			lineInput.save().done(function(){
				console.log("new lineInput id IS:")
				console.log(lineInput.get('id'))
				var oldChildNewPos = lineInput.get('id');
				oldChild.set('position', oldChildNewPos);
				oldChild.save();

				this.collection.add(lineInput); // THIS WILL TRIGGER CHANGE EVENT.
				lineInput.save();
			}.bind(this));
			
			
			 // THIS WILL TRIGGER CHANGE EVENT?  *SHOULD INSERT INTO DOM AUTOMATICALLY WITH REDRAW*
		} else {
			var lineInput = new Line({
			  content    : "",
				user_color : "none",
				position : (previous)
			});
			this.collection.add(lineInput); // THIS WILL TRIGGER CHANGE EVENT.
			lineInput.save();
			// THIS WILL TRIGGER CHANGE EVENT?  *SHOULD INSERT INTO DOM AUTOMATICALLY WITH REDRAW*
			
		}// end if previousinput model not 0
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