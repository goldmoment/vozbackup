define(["jquery","libs/utility"], function($, utility) {
	function View(controller) {
		this.controller = controller;
		this.lastIndex = 0;
		this.title = '';
	}

	View.prototype.render = function(data, className) {
		for (var i = 0; i < data.length; i++) {
			var object = data[i];

			var content = object.get('content').replace(/src="\//g, 'src="https://vozforums.com/');
			content = content.replace(/src="i/g, 'src="https://vozforums.com/i');
			content = content.replace(/style="border:1px inset"/g, '');
			content = content.replace(/<br><\/br><br><\/br>/g, '<br></br>');

			var info = '<div class="cmt-author"><div class ="cmt-image">' +
				object.get('avater') + '</div><div class ="cmt-info"><p>' +
				object.get('author') + '</p><i>' + 
				utility.convertTimestamp(object.get('time')) + '</i></div><div class ="cmt-index"><span>#' + 
				object.get('index') + '</span></div></div>';

			info = info.replace(/src="cu/g, 'src="https://vozforums.com/cu');

			$( "."+className ).append('<div class="cmt-content shadow">'+info+content+'</div>');
		}

		return true;
	};

	View.prototype.onEvent = function() {
		var that = this;
		$('.content').off('scroll');
		$('.content').on('scroll', function() {

			/* Move input to correct location */
			// console.log($(this).scrollTop());
			// $('.input').css({
			// 	'top': ($(this).scrollTop())
			// });

			/* Check scroll is end */
			if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
				if (that.lastIndex != 0) {
					that.controller.loadNext();
				}
			}
		});
	}

	View.prototype.clear = function () {
		$( ".cmt-content" ).remove();
	}

	return View;
});