define(["jquery"], function($) {
	
	function View(controller) {
		this.controller = controller;
		this.lastCreatedAt = '';
		this.lastUpdatedAt = '';
	}
	
	View.prototype.render = function(data) {
		for (var i = 0; i < data.length; i++) {
			var object = data[i];
			$( ".left-panel" ).append('<div class="title" id="'+
				object.get('threadId')+'"><p>'+object.get('title')+'</p>'+
				'<span>  '+object.get('replies')+'</span>'+'</div>');
		}
		return true;
	}

	View.prototype.onEvent = function() {
		var that = this;
		$('.title').off("click");
		$('.title').on('click', function() {
			$(".highlight").removeClass("highlight");
			$(this).addClass("highlight");

			that.controller.loadCmts($(this).attr("id"), $(this).children("p").text());
			/* Add title for control */
			$( ".cmt-ctl > input" ).val($(this).children("p").text());
		});

		$('.left-panel').off('scroll');
		$('.left-panel').on('scroll', function() {
			if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
				$('.left-panel').off('scroll');
				that.controller.loadNext();
			}
		});
	}

	View.prototype.clear = function() {
		$( ".title" ).remove();
		$('.left-panel').off('scroll');
		this.lastUpdatedAt = '';
		this.lastCreatedAt = '';
	}

	return View;
});