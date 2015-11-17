define(["jquery"], function($) {
	
	function View(controller) {
		this.controller = controller;
	}
	
	View.prototype.render = function() {
		return true;
	}

	View.prototype.onEvent = function() {
		var that = this;

		$('.new-cmt').off("click");
		$('.new-cmt').on('click', function() {
			that.controller.loadTheadByNewComment();
		});

		$('.new-thr').off("click");
		$('.new-thr').on('click', function() {
			that.controller.loadTheadByNewThread();
		});

		$('.f-no').off("click");
		$('.f-no').on('click', function() {
			if ($(this).text() == 'f17') {
				$(this).text('f145');
			} else if ($(this).text() == 'f145') {
				$(this).text('f33');
			} else if ($(this).text() == 'f33') {
				$(this).text('f17');
			}
		});

		$('.cmt-ctl > input').keyup(function(e){
			if(e.keyCode == 13)
			{
				var index = parseInt($(this).val());
				if (index < 4000) {
					that.controller.loadCmtsWithIndex( index );
				} else {
					that.controller.loadCmtsWithId( $(this).val() );
				}
				// alert('h');
			}
		});

		$( ".cmt-ctl" ).hover(
			function() {
				$( ".cmt-ctl > input" ).val('');
			}, function() {
				$( ".cmt-ctl > input" ).val(that.controller.cmtController.view.title);
			}
		);
	}

	return View;
});